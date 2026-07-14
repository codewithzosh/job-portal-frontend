import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
import { format } from "date-fns";


const AdditionalDetails = ({
  expectedSalary,
  setExpectedSalary,
  availableFrom,
  setAvailableFrom,
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Additional Details
        </h2>
        <p className="text-slate-600">
          Provide salary expectations and availability (both optional)
        </p>
      </div>

      <Card>
        <CardContent className={"space-y-5"}>
          <div className="space-y-2">
            <Label>Expected Salary (INR)</Label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">
                {" "}
                ₹
              </span>
              <Input
                min="0"
                placeholder="e.g. 80000"
                type="number"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                className={"pl-7 py-5"}
              />
            </div>
          </div>

          {/* Available From Date */}
          <div className="space-y-2">
            <Label>Available From</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                variant="outline"
                  className={`
                    py-5
                  w-full justify-start text-left font-normal,
                    ${!availableFrom && "text-muted-foreground"}
                  )`}
                >
                  <CalendarIcon className="mr-2 size-4" />
                  {availableFrom ? format(availableFrom, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={availableFrom}
                  onSelect={(date) => {
                    setAvailableFrom(date);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdditionalDetails;
