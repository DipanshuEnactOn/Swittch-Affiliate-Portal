"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format, subDays } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import moment from "moment";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useTranslation } from "@/i18n/client";

const getDateFromParams = (param: string): Date | undefined => {
  const date = new Date(param);
  return isNaN(date.getTime()) ? undefined : date;
};

export default function FilterComponent() {
  const { t } = useTranslation();
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const searchParams = new URLSearchParams(params);

  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");
  const currentDate = new Date();
  const defaultFromDate = subDays(currentDate, 30);

  const fromDate = fromParam ? getDateFromParams(fromParam) : defaultFromDate;
  const toDate = toParam ? getDateFromParams(toParam) : currentDate;

  const [date, setDate] = useState<DateRange | undefined>({
    from: fromDate,
    to: toDate,
  });

  useEffect(() => {
    searchParams.set("from", moment(defaultFromDate).format("YYYY-MM-DD"));
    searchParams.set("to", moment(currentDate).format("YYYY-MM-DD"));
    router.push(`${pathname}?${searchParams.toString()}`);
  }, []);

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "all" && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const hasActiveFilters = statusFilter !== "all" || (date?.from && date?.to);

  const clearFilters = () => {
    setStatusFilter("all");
    setDate(undefined);
    router.push(pathname);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{t("filters.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="space-y-2">
              <Label>{t("filters.status.label")}</Label>
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value);
                  updateSearchParams("status", value);
                }}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder={t("filters.status.all")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("filters.status.all")}</SelectItem>
                  <SelectItem value="confirmed">
                    {t("filters.status.confirmed")}
                  </SelectItem>
                  <SelectItem value="pending">
                    {t("filters.status.pending")}
                  </SelectItem>
                  <SelectItem value="declined">
                    {t("filters.status.declined")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("filters.dateRange")}</Label>
              <div className={cn("grid gap-2")}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>{t("filters.placeholder")}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={(e) => {
                        setDate(e);
                        searchParams.set(
                          "from",
                          moment(e?.from).format("YYYY-MM-DD")
                        );
                        searchParams.set(
                          "to",
                          moment(e?.to).format("YYYY-MM-DD")
                        );
                        router.push(`${pathname}?${searchParams.toString()}`);
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <Button onClick={clearFilters} className="self-start md:self-end">
              <X className="mr-2 h-4 w-4" />
              {t("filters.clear")}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
