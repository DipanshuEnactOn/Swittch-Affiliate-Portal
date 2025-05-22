import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { createTranslation } from "@/i18n/server";

export default async function PendingPage() {
  const { t } = await createTranslation();

  return (
    <AuthLayout>
      <div className="max-h-screen flex">
        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="w-full p-8">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <CardTitle className="text-center">
                {t("auth.pending.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                {t("auth.pending.message")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthLayout>
  );
}
