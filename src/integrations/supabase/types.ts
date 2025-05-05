export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          achievement_id: number
          date_earned: string | null
          description: string | null
          title: string | null
          user_id: number | null
        }
        Insert: {
          achievement_id?: number
          date_earned?: string | null
          description?: string | null
          title?: string | null
          user_id?: number | null
        }
        Update: {
          achievement_id?: number
          date_earned?: string | null
          description?: string | null
          title?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      activity_log: {
        Row: {
          activity_time: string | null
          activity_type: string | null
          description: string | null
          log_id: number
          user_id: number | null
        }
        Insert: {
          activity_time?: string | null
          activity_type?: string | null
          description?: string | null
          log_id?: number
          user_id?: number | null
        }
        Update: {
          activity_time?: string | null
          activity_type?: string | null
          description?: string | null
          log_id?: number
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      auth: {
        Row: {
          auth_id: number
          email: string
          hashed_password: string
          user_id: number | null
        }
        Insert: {
          auth_id?: number
          email: string
          hashed_password: string
          user_id?: number | null
        }
        Update: {
          auth_id?: number
          email?: string
          hashed_password?: string
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "auth_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      bmi_records: {
        Row: {
          bmi_id: number
          bmi_result: number | null
          height_cm: number | null
          recorded_date: string | null
          user_id: number | null
          weight_kg: number | null
        }
        Insert: {
          bmi_id?: number
          bmi_result?: number | null
          height_cm?: number | null
          recorded_date?: string | null
          user_id?: number | null
          weight_kg?: number | null
        }
        Update: {
          bmi_id?: number
          bmi_result?: number | null
          height_cm?: number | null
          recorded_date?: string | null
          user_id?: number | null
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bmi_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      diets: {
        Row: {
          calories: number | null
          carbs: number | null
          diet_id: number
          fats: number | null
          meal_date: string | null
          meal_type: string | null
          protein: number | null
          user_id: number | null
        }
        Insert: {
          calories?: number | null
          carbs?: number | null
          diet_id?: number
          fats?: number | null
          meal_date?: string | null
          meal_type?: string | null
          protein?: number | null
          user_id?: number | null
        }
        Update: {
          calories?: number | null
          carbs?: number | null
          diet_id?: number
          fats?: number | null
          meal_date?: string | null
          meal_type?: string | null
          protein?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "diets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      feedback: {
        Row: {
          feedback_date: string | null
          feedback_id: number
          feedback_text: string | null
          rating: number | null
          user_id: number | null
        }
        Insert: {
          feedback_date?: string | null
          feedback_id?: number
          feedback_text?: string | null
          rating?: number | null
          user_id?: number | null
        }
        Update: {
          feedback_date?: string | null
          feedback_id?: number
          feedback_text?: string | null
          rating?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      goals: {
        Row: {
          current_value: number | null
          end_date: string | null
          goal_id: number
          goal_type: string | null
          start_date: string | null
          status: string | null
          target_value: number | null
          user_id: number | null
        }
        Insert: {
          current_value?: number | null
          end_date?: string | null
          goal_id?: number
          goal_type?: string | null
          start_date?: string | null
          status?: string | null
          target_value?: number | null
          user_id?: number | null
        }
        Update: {
          current_value?: number | null
          end_date?: string | null
          goal_id?: number
          goal_type?: string | null
          start_date?: string | null
          status?: string | null
          target_value?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      progress: {
        Row: {
          goal_id: number | null
          progress_date: string | null
          progress_id: number
          value_achieved: number | null
        }
        Insert: {
          goal_id?: number | null
          progress_date?: string | null
          progress_id?: number
          value_achieved?: number | null
        }
        Update: {
          goal_id?: number | null
          progress_date?: string | null
          progress_id?: number
          value_achieved?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "progress_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["goal_id"]
          },
        ]
      }
      reminders: {
        Row: {
          active: boolean | null
          message: string | null
          reminder_id: number
          reminder_time: string | null
          reminder_type: string | null
          user_id: number | null
        }
        Insert: {
          active?: boolean | null
          message?: string | null
          reminder_id?: number
          reminder_time?: string | null
          reminder_type?: string | null
          user_id?: number | null
        }
        Update: {
          active?: boolean | null
          message?: string | null
          reminder_id?: number
          reminder_time?: string | null
          reminder_type?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reminders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          age: number | null
          created_at: string | null
          full_name: string
          gender: string | null
          user_id: number
        }
        Insert: {
          age?: number | null
          created_at?: string | null
          full_name: string
          gender?: string | null
          user_id?: number
        }
        Update: {
          age?: number | null
          created_at?: string | null
          full_name?: string
          gender?: string | null
          user_id?: number
        }
        Relationships: []
      }
      workouts: {
        Row: {
          calories_burned: number | null
          duration_minutes: number | null
          user_id: number | null
          workout_date: string | null
          workout_id: number
          workout_type: string | null
        }
        Insert: {
          calories_burned?: number | null
          duration_minutes?: number | null
          user_id?: number | null
          workout_date?: string | null
          workout_id?: number
          workout_type?: string | null
        }
        Update: {
          calories_burned?: number | null
          duration_minutes?: number | null
          user_id?: number | null
          workout_date?: string | null
          workout_id?: number
          workout_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workouts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
