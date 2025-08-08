import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card.tsx";
import {type BoopSize} from "@/boop-sizes/service";
import {Button} from "@/components/ui/button";
import {Command, CommandGroup, CommandList, CommandItem, CommandEmpty} from "@/components/ui/command.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import * as React from "react";
import {ChevronsUpDown} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {useState} from "react";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";

const SummaryCard = ({boopSize}: { boopSize: BoopSize }) => {
  return (
    <Card key={boopSize.id}>
      <CardHeader>
        <CardTitle>{boopSize.name}</CardTitle>
        <CardDescription>BoopSize</CardDescription>
        {/*<CardAction>Card Action</CardAction>*/}
      </CardHeader>
      {/*<CardContent>*/}
      {/*  <p>Size: {boopSize.name} ({boopSize.value})</p>*/}
      {/*</CardContent>*/}
      {/*<CardFooter>*/}
      {/*  <p>Card Footer</p>*/}
      {/*</CardFooter>*/}
    </Card>
  )
}

type BoopSizeSelectorProps = {
  boopSizes: BoopSize[];
  boopSizeId: string;
  setBoopSizeId: (value: string) => void;
}

export const BoopSizeSelectorRadio = ({boopSizes, setBoopSizeId, boopSizeId}: BoopSizeSelectorProps) => {
  return (
    <RadioGroup onValueChange={setBoopSizeId} defaultValue={boopSizeId}>
      {
        boopSizes.map((boopSize: BoopSize) => (
          <div className="flex items-center gap-3" key={boopSize.id}>
            <RadioGroupItem key={boopSize.id} value={`${boopSize.id}`} id={`boop-size-${boopSize.id}`}/>
            <Label htmlFor={`boop-size-${boopSize.id}`}>{boopSize.name}</Label>
          </div>
        ))
      }
    </RadioGroup>
  )
}

export const BoopSizeSelectorSelect = ({boopSizes}: { boopSizes: BoopSize[] }) => {
  const [boopValue, setBoopValue] = useState("");
  return (
    <Select value={boopValue} onValueChange={setBoopValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme"/>
      </SelectTrigger>
      <SelectContent>
        {boopSizes.map((boopSize: BoopSize) => (
          <SelectItem key={boopSize.id} value={boopSize.name}>
            {boopSize.name}
          </SelectItem>)
        )}
      </SelectContent>
    </Select>
  )
}

export const BoopSizeSelectorPopover = ({boopSizes}: { boopSizes: BoopSize[] }) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? boopSizes.find((boopSize) => String(boopSize.value) === value)?.name
            : "Select task type size..."}
          <ChevronsUpDown className="opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No Task Type sizes found.</CommandEmpty>
            <CommandGroup>
              {boopSizes.map(boopSize => (
                <CommandItem
                  key={boopSize.id}
                  value={String(boopSize.value)}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {boopSize.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export {SummaryCard}