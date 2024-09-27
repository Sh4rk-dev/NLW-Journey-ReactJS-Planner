import { useState } from "react";

import {
  ArrowRight,
  Calendar,
  Check,
  MapPin,
  Settings2,
  X,
} from "lucide-react";
import { Button } from "../../../components/button";

import "react-day-picker/dist/style.css";
import { DateRange, DayPicker, getDefaultClassNames } from "react-day-picker";

import { format } from "date-fns";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  eventStartAndEndDates: DateRange | undefined;

  openOrCloseGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

export function DestinationAndDateStep({
  setDestination,
  isGuestsInputOpen,
  openOrCloseGuestsInput,
  eventStartAndEndDates,
  setEventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const defaultClassNames = getDefaultClassNames();

  function openOrCloseDatePicker() {
    return setIsDatePickerOpen(() => !isDatePickerOpen);
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "dd' de 'LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "dd' de 'LLL"))
      : null;

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          type="text"
          placeholder="Para onde você vai?"
          disabled={isGuestsInputOpen}
          className=" bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <button
        onClick={openOrCloseDatePicker}
        disabled={isGuestsInputOpen}
        className="flex items-center gap-2 text-left w-[248px]"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className=" text-lg text-zinc-400 w-48 flex-1">
          {displayedDate || "Quando ? "}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-lg py-8 px-6 shadow-shape bg-zinc-900 space-y-5 flex flex-col">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button>
                  <X
                    onClick={openOrCloseDatePicker}
                    className="size-5 text-zinc-400"
                  />
                </button>
              </div>
            </div>

            <DayPicker
              mode="range"
              defaultMonth={new Date()}
              classNames={{
                today: `text-lime-300 `,
                range_end: `rounded-r-full`,
                range_start: `rounded-l-full`,
                selected: `bg-lime-500 text-white`,
                root: `${defaultClassNames.root} shadow-lg p-5`,
                chevron: `${defaultClassNames.chevron} fill-lime-300`,
                weekday: `${defaultClassNames.weekday} text-zinc-400`,
              }}
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
            />

            <Button onClick={openOrCloseDatePicker} variant="primary">
              <Check className="size-5" />
              Confirmar data
            </Button>
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button onClick={openOrCloseGuestsInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={openOrCloseGuestsInput} variant="primary">
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
