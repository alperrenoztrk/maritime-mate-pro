export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_content_reports: {
        Row: {
          created_at: string
          id: string
          note: string | null
          reason: string
          reported_content: string
          status: string
          surface: string
          user_id: string
          user_prompt: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          note?: string | null
          reason: string
          reported_content: string
          status?: string
          surface: string
          user_id: string
          user_prompt?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          note?: string | null
          reason?: string
          reported_content?: string
          status?: string
          surface?: string
          user_id?: string
          user_prompt?: string | null
        }
        Relationships: []
      }
      ai_usage: {
        Row: {
          period: string
          updated_at: string
          used: number
          user_id: string
        }
        Insert: {
          period: string
          updated_at?: string
          used?: number
          user_id: string
        }
        Update: {
          period?: string
          updated_at?: string
          used?: number
          user_id?: string
        }
        Relationships: []
      }
      maritime_documents: {
        Row: {
          analysis_version: string
          confidence: number
          content_hash: string
          created_at: string
          date_evidence: string | null
          document_number: string | null
          document_type: string
          expiry_date: string | null
          holder_name: string | null
          id: string
          image_path: string
          issue_date: string | null
          issuing_authority: string | null
          issuing_country: string | null
          mime_type: string
          no_expiry: boolean
          original_filename: string | null
          raw_analysis: Json
          reminder_days: number[]
          review_required: boolean
          title: string
          updated_at: string
          user_id: string
          warnings: string[]
        }
        Insert: {
          analysis_version?: string
          confidence?: number
          content_hash: string
          created_at?: string
          date_evidence?: string | null
          document_number?: string | null
          document_type: string
          expiry_date?: string | null
          holder_name?: string | null
          id?: string
          image_path: string
          issue_date?: string | null
          issuing_authority?: string | null
          issuing_country?: string | null
          mime_type?: string
          no_expiry?: boolean
          original_filename?: string | null
          raw_analysis?: Json
          reminder_days?: number[]
          review_required?: boolean
          title: string
          updated_at?: string
          user_id: string
          warnings?: string[]
        }
        Update: {
          analysis_version?: string
          confidence?: number
          content_hash?: string
          created_at?: string
          date_evidence?: string | null
          document_number?: string | null
          document_type?: string
          expiry_date?: string | null
          holder_name?: string | null
          id?: string
          image_path?: string
          issue_date?: string | null
          issuing_authority?: string | null
          issuing_country?: string | null
          mime_type?: string
          no_expiry?: boolean
          original_filename?: string | null
          raw_analysis?: Json
          reminder_days?: number[]
          review_required?: boolean
          title?: string
          updated_at?: string
          user_id?: string
          warnings?: string[]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          provider: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          provider?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          provider?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quiz_results: {
        Row: {
          completed_at: string
          created_at: string
          exam_name: string
          exam_type: string | null
          id: string
          module_id: string
          percentage: number | null
          question_results: Json
          score: number
          time_spent_seconds: number | null
          total_questions: number
          user_id: string
        }
        Insert: {
          completed_at?: string
          created_at?: string
          exam_name: string
          exam_type?: string | null
          id?: string
          module_id: string
          percentage?: number | null
          question_results?: Json
          score: number
          time_spent_seconds?: number | null
          total_questions: number
          user_id: string
        }
        Update: {
          completed_at?: string
          created_at?: string
          exam_name?: string
          exam_type?: string | null
          id?: string
          module_id?: string
          percentage?: number | null
          question_results?: Json
          score?: number
          time_spent_seconds?: number | null
          total_questions?: number
          user_id?: string
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          bucket: string
          count: number
          updated_at: string
          window_start: string
        }
        Insert: {
          bucket: string
          count?: number
          updated_at?: string
          window_start: string
        }
        Update: {
          bucket?: string
          count?: number
          updated_at?: string
          window_start?: string
        }
        Relationships: []
      }
      user_category_stats: {
        Row: {
          category: string
          correct_answers: number
          id: string
          last_attempt_at: string | null
          total_questions: number
          updated_at: string
          user_id: string
          wrong_answers: number
        }
        Insert: {
          category: string
          correct_answers?: number
          id?: string
          last_attempt_at?: string | null
          total_questions?: number
          updated_at?: string
          user_id: string
          wrong_answers?: number
        }
        Update: {
          category?: string
          correct_answers?: number
          id?: string
          last_attempt_at?: string | null
          total_questions?: number
          updated_at?: string
          user_id?: string
          wrong_answers?: number
        }
        Relationships: []
      }
      user_entitlements: {
        Row: {
          acknowledged: boolean
          auto_renewing: boolean
          created_at: string
          expires_at: string | null
          id: string
          order_id: string | null
          platform: string
          product_id: string
          product_type: string
          purchase_token: string
          raw_payload: Json | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          acknowledged?: boolean
          auto_renewing?: boolean
          created_at?: string
          expires_at?: string | null
          id?: string
          order_id?: string | null
          platform?: string
          product_id: string
          product_type: string
          purchase_token: string
          raw_payload?: Json | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          acknowledged?: boolean
          auto_renewing?: boolean
          created_at?: string
          expires_at?: string | null
          id?: string
          order_id?: string | null
          platform?: string
          product_id?: string
          product_type?: string
          purchase_token?: string
          raw_payload?: Json | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_generated_components: {
        Row: {
          category: Database["public"]["Enums"]["component_category"] | null
          code: string
          component_type: Database["public"]["Enums"]["component_type"]
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          metadata: Json | null
          name: string
          thumbnail_url: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["component_category"] | null
          code: string
          component_type: Database["public"]["Enums"]["component_type"]
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          metadata?: Json | null
          name: string
          thumbnail_url?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: Database["public"]["Enums"]["component_category"] | null
          code?: string
          component_type?: Database["public"]["Enums"]["component_type"]
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          metadata?: Json | null
          name?: string
          thumbnail_url?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      consume_ai_credit: {
        Args: { p_limit: number; p_period: string; p_user_id: string }
        Returns: {
          allowed: boolean
          used: number
        }[]
      }
      consume_rate_limit: {
        Args: { p_bucket: string; p_limit: number; p_window_sec: number }
        Returns: {
          allowed: boolean
          retry_after_sec: number
        }[]
      }
      prune_rate_limits: { Args: { p_older_than?: string }; Returns: number }
    }
    Enums: {
      component_category:
        | "navigation"
        | "stability"
        | "safety"
        | "cargo"
        | "engine"
        | "weather"
        | "general"
      component_type:
        | "calculation"
        | "chart"
        | "topic"
        | "table"
        | "animation"
        | "form"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      component_category: [
        "navigation",
        "stability",
        "safety",
        "cargo",
        "engine",
        "weather",
        "general",
      ],
      component_type: [
        "calculation",
        "chart",
        "topic",
        "table",
        "animation",
        "form",
      ],
    },
  },
} as const
