import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/safeClient';
import { NATIVE_APP_DEEP_LINK, nativeBridgeCapture } from '@/lib/nativeAuthBridge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Authentication işlemi gerçekleştiriliyor...');
  // Native (Capacitor) köprü dönüşünde uygulamaya dönüş deep link'i.
  // Dolu ise web içi yönlendirme yapılmaz, "Uygulamaya Dön" gösterilir.
  const [nativeReturnUrl, setNativeReturnUrl] = useState<string | null>(null);

  useEffect(() => {
    // Native uygulamadan başlatılan OAuth dönüşü: token'lar bu web sayfasına
    // geldi (fragment main.tsx'te nativeBridgeCapture ile yakalandı). Görev,
    // oturumu web'de kurmak değil, token'ları deep link ile uygulamaya
    // aktarmak. Otomatik yönlendirme tarayıcı tarafından engellenirse buton
    // kullanıcı dokunuşuyla aynı işi yapar.
    const handleNativeBridge = async () => {
      let target: string | null = null;
      let ok = false;

      if (nativeBridgeCapture.hash && !nativeBridgeCapture.errorDescription) {
        target = `${NATIVE_APP_DEEP_LINK}#${nativeBridgeCapture.hash}`;
        ok = /(^|&)access_token=/.test(nativeBridgeCapture.hash);
      } else if (nativeBridgeCapture.code) {
        target = `${NATIVE_APP_DEEP_LINK}?code=${encodeURIComponent(nativeBridgeCapture.code)}`;
        ok = true;
      } else if (!nativeBridgeCapture.errorDescription) {
        // Güvenlik ağı: fragment bir şekilde supabase-js tarafından tüketilip
        // web oturumu kurulduysa token'ları oradan aktar ve web kopyasını
        // yerelden sil (aynı refresh token ailesini iki istemcinin
        // paylaşması ileride her iki oturumu da düşürür).
        const { data } = await supabase.auth.getSession();
        if (data.session?.access_token && data.session?.refresh_token) {
          target = `${NATIVE_APP_DEEP_LINK}#access_token=${encodeURIComponent(
            data.session.access_token,
          )}&refresh_token=${encodeURIComponent(data.session.refresh_token)}`;
          ok = true;
          await supabase.auth.signOut({ scope: 'local' });
        }
      }

      if (ok && target) {
        setStatus('success');
        setMessage('Giriş başarılı! Uygulamaya dönülüyor…');
        setNativeReturnUrl(target);
        // Otomatik dönüş denemesi; kullanıcı hareketi olmadan engellenirse
        // ekrandaki buton kalır.
        window.location.replace(target);
        return;
      }

      setStatus('error');
      setMessage(
        nativeBridgeCapture.errorDescription
          ? `Giriş hatası: ${nativeBridgeCapture.errorDescription}`
          : 'Giriş tamamlanamadı. Lütfen uygulamaya dönüp tekrar deneyin.',
      );
      // Hata durumunda da uygulamaya dönüş sunulur (parametresiz deep link
      // uygulamayı sadece öne getirir).
      setNativeReturnUrl(target ?? NATIVE_APP_DEEP_LINK);
    };

    const handleAuthCallback = async () => {
      try {
        if (nativeBridgeCapture.active) {
          await handleNativeBridge();
          return;
        }
        console.log('Auth callback başladı (PKCE exchange)');
        const url = new URL(window.location.href);
        const nextPath = (() => {
          const raw = url.searchParams.get('next');
          const candidate = raw && raw.startsWith('/') && !raw.startsWith('//')
            ? raw
            : (() => {
                try {
                  const stored = sessionStorage.getItem('postAuthReturn');
                  if (stored && stored.startsWith('/') && !stored.startsWith('//')) {
                    sessionStorage.removeItem('postAuthReturn');
                    return stored;
                  }
                } catch {
                  // ignore
                }
                return '/';
              })();
          return candidate;
        })();
        const code = url.searchParams.get('code');
        const errorParam = url.searchParams.get('error');
        const errorDescription = url.searchParams.get('error_description');

        // Sağlayıcıdan dönen bir hata varsa
        if (errorParam) {
          console.error('OAuth error from provider:', { errorParam, errorDescription });
          setStatus('error');
          setMessage(`Giriş hatası: ${errorDescription || errorParam}`);
          toast.error('Google ile giriş reddedildi.');
          setTimeout(() => navigate('/', { replace: true }), 3000);
          return;
        }

        // URL'de code varsa PKCE exchange yap
        if (code) {
          console.log('Code bulundu, exchangeCodeForSession çalıştırılıyor...');
          const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);
          if (error) {
            console.error('Code exchange hatası:', error);
            throw error;
          }
          console.log('Code exchange başarılı:', {
            user: data?.user?.email,
            session: !!data?.session
          });

          // URL'den query parametrelerini temizle
          window.history.replaceState({}, document.title, window.location.pathname);

          setStatus('success');
          const email = data.session?.user?.email || data.user?.email;
          const fullName = data.session?.user?.user_metadata?.full_name;
          setMessage(`Hoş geldiniz, ${fullName || email || 'kullanıcı'}!`);
          toast.success('Google ile başarıyla giriş yaptınız!');
          setTimeout(() => navigate(nextPath, { replace: true }), 1500);
          return;
        }

        // Code yoksa mevcut session var mı kontrol et
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        console.log('ℹ️ getSession sonucu:', { sessionData, sessionError });
        if (sessionError) throw sessionError;

        if (sessionData.session) {
          setStatus('success');
          const email = sessionData.session.user.email;
          const fullName = sessionData.session.user.user_metadata?.full_name;
          setMessage(`Hoş geldiniz, ${fullName || email}!`);
          toast.success('Google ile başarıyla giriş yaptınız!');
          setTimeout(() => navigate(nextPath, { replace: true }), 1500);
          return;
        }

        // Son çare: implicit flow ile dönmüş token'lar var mı (hash'ten)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        if (accessToken && refreshToken) {
          console.log('ℹ️ Hash token\'ları bulundu, setSession ile oturum kuruluyor...');
          const { data: setData, error: setError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (setError) throw setError;
          if (setData.session) {
            window.history.replaceState({}, document.title, window.location.pathname);
            setStatus('success');
            const sessionUser = setData.session.user;
            setMessage(`Hoş geldiniz, ${sessionUser.user_metadata?.full_name || sessionUser.email}!`);
            toast.success('Google ile başarıyla giriş yaptınız!');
            setTimeout(() => navigate(nextPath, { replace: true }), 1500);
            return;
          }
        }

        throw new Error('Session oluşturulamadı. Lütfen tekrar deneyin.');
      } catch (error: unknown) {
        console.error('Auth callback error:', error);
        setStatus('error');
        const msg = error instanceof Error ? error.message : 'Bilinmeyen hata';
        setMessage(`Giriş hatası: ${msg}`);
        toast.error('Giriş işlemi başarısız oldu. Lütfen tekrar deneyin.');
        setTimeout(() => navigate('/', { replace: true }), 2500);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-8 h-8 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'error':
        return <XCircle className="w-8 h-8 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'text-blue-600';
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
    }
  };

  return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 cyberpunk:from-black cyberpunk:to-gray-900 neon:from-slate-900 neon:to-slate-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {getStatusIcon()}
          </div>
          <CardTitle className={`text-xl ${getStatusColor()}`}>
            {status === 'loading' && 'Giriş İşlemi Devam Ediyor'}
            {status === 'success' && 'Giriş Başarılı!'}
            {status === 'error' && 'Giriş Hatası'}
          </CardTitle>
          <CardDescription>
            {message}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center">
          {status === 'loading' && (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                Google hesabınız doğrulanıyor...
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          )}
          
          {status === 'success' && (
            <div className="space-y-3">
              {nativeReturnUrl ? (
                <>
                  <Button asChild className="w-full gap-2">
                    <a href={nativeReturnUrl}>
                      <Smartphone className="w-4 h-4" />
                      Uygulamaya Dön
                    </a>
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Otomatik dönüş çalışmazsa yukarıdaki butona dokunun.
                  </div>
                </>
              ) : (
                <>
                  <div className="text-sm text-green-600 font-medium">
                    Hesabınız başarıyla oluşturuldu
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Ana sayfaya yönlendiriliyorsunuz...
                  </div>
                </>
              )}
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-3">
              <div className="text-sm text-red-600">
                Giriş işlemi tamamlanamadı
              </div>
              {nativeReturnUrl ? (
                <Button asChild variant="outline" className="w-full gap-2">
                  <a href={nativeReturnUrl}>
                    <Smartphone className="w-4 h-4" />
                    Uygulamaya Dön
                  </a>
                </Button>
              ) : (
                <div className="text-sm text-muted-foreground">
                  Ana sayfaya yönlendiriliyorsunuz...
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallback;