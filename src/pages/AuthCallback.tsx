import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/safeClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Authentication işlemi gerçekleştiriliyor...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Auth callback başladı (PKCE exchange)');
        const url = new URL(window.location.href);
        const nextPath = (() => {
          const raw = url.searchParams.get('next');
          if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/';
          return raw;
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
      } catch (error: any) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setMessage(`Giriş hatası: ${error?.message || 'Bilinmeyen hata'}`);
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
              <div className="text-sm text-green-600 font-medium">
                Hesabınız başarıyla oluşturuldu
              </div>
              <div className="text-sm text-muted-foreground">
                Ana sayfaya yönlendiriliyorsunuz...
              </div>
            </div>
          )}
          
          {status === 'error' && (
            <div className="space-y-3">
              <div className="text-sm text-red-600">
                Giriş işlemi tamamlanamadı
              </div>
              <div className="text-sm text-muted-foreground">
                Ana sayfaya yönlendiriliyorsunuz...
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallback;