import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export function PayoutRequest({ open, setOpen }: any) {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Payout Request</DialogTitle>
          </DialogHeader>

          <div>
            <h3>Are you sure you want to withdraw?</h3>
            <h5>Your withdrawal amount is $1230.</h5>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="text-black"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-brand-500 hover:bg-brand-600">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
