"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Api } from "@/services/api-services";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n/client";

export function PayoutRequest({ open, setOpen, amount }: any) {
  const { t } = useTranslation();
  const user = useSession().data?.user;
  const router = useRouter();

  const handleRequest = async (amount: number) => {
    try {
      const data = {
        id: user?.id,
        amount,
      };
      const response = await Api.post({ path: "/payout-request", body: data });
      if (response.status === "error") {
        toast({
          variant: "destructive",
          title: t("payout.errorTitle"),
          description: response.message || t("payout.errorMessage"),
        });
        return;
      }
      toast({
        title: t("payout.successTitle"),
        description: t("payout.successMessage"),
      });
      router.refresh();
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("payout.errorTitle"),
        description: t("payout.errorMessage"),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("payout.payout_title")}</DialogTitle>
        </DialogHeader>

        <div>
          <h3>{t("payout.confirmation")}</h3>
          <h5>{t("payout.amountText").replace("{amount}", amount)}</h5>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="text-black"
          >
            {t("payout.cancel")}
          </Button>
          <Button
            type="submit"
            className="bg-brand-500 hover:bg-brand-600"
            onClick={() => handleRequest(amount)}
          >
            {t("payout.confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
