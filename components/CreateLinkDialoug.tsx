import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateAffiliateLink({ open, setOpen }: any) {
  const mainUrl = "http://localhost:3000";
  const [link, setLink] = useState("algo-crane");

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Your Affiliate Link</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Once Created, URLs Cannot be Changed.
            </p>
          </DialogHeader>

          <div>
            <div className="flex flex-col gap-2 py-4">
              <Label htmlFor="link" className="text-left">
                URL
              </Label>
              <div className="relative w-full max-w-md">
                <span
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none select-none"
                  style={{ userSelect: "none" }}
                >
                  {mainUrl}/
                </span>
                <Input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="pl-[calc( (100%) / 3 )] pr-3 py-2 w-full border rounded"
                  style={{ paddingLeft: `${mainUrl.length - 1}ch` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 py-4">
              <Label htmlFor="link" className="text-left">
                Note
              </Label>
              <Input
                id="note"
                value={"EnactOn"}
                onChange={(e) => setLink(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="text-black"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-brand-500">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
