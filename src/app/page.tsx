"use client";

import { useState } from "react";
import DollarIcon from "./dollarIcon";
import PersonIcon from "./personIcon";
import Logo from "./logo";

export default function Home() {
  const [billAmount, setBillAmount] = useState<number>(0);
  const [tipPct, setTipPct] = useState<number>(0);
  const [peopleNum, setPeopleNum] = useState<number>(0);

  const [activeButton, setActiveButton] = useState<number | null>(null);

  const btnList = [
    {
      label: "5%",
      value: 5,
    },
    {
      label: "10%",
      value: 10,
    },
    {
      label: "15%",
      value: 15,
    },
    {
      label: "25%",
      value: 25,
    },
    {
      label: "50%",
      value: 50,
    },
  ];

  const onBillAmontChange = (e: React.FormEvent<HTMLInputElement>) => {
    const amt = parseFloat(e.currentTarget.value);
    if (!isNaN(amt)) {
      setBillAmount(amt);
    } else {
      setBillAmount(0);
    }
  };

  const onPeopleNumChange = (e: React.FormEvent<HTMLInputElement>) => {
    const peopleNum = parseInt(e.currentTarget.value);
    if (!isNaN(peopleNum)) {
      setPeopleNum(peopleNum);
    } else {
      setPeopleNum(0);
    }
  };

  const calculateTipPerPerson = (): string => {
    if (billAmount < 0 || peopleNum < 0 || tipPct < 0) {
      return "0.00";
    }
    return ((billAmount * tipPct) / 100 / peopleNum).toFixed(2);
  };

  const calculateTotalPerPerson = (): string => {
    if (billAmount < 0 || peopleNum < 0 || tipPct < 0) {
      return "0.00";
    }
    return ((billAmount + (billAmount * tipPct) / 100) / peopleNum).toFixed(2);
  };

  const onCustomTipPctChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTipPct(parseInt(e.currentTarget.value));
  };

  const resetStates = () => {
    setBillAmount(0);
    setTipPct(0);
    setPeopleNum(0);
    setActiveButton(null);
    (document.getElementById("bill") as HTMLInputElement).value = "";
    (document.getElementById("custom") as HTMLInputElement).value = "";
    (document.getElementById("numpeople") as HTMLInputElement).value = "";
  };

  return (
    <main className="mx-auto flex flex-col gap-10 max-sm:mt-12 sm:max-w-[50rem] sm:gap-16">
      <div className="mx-auto">
        <Logo />
      </div>
      <div className="grid gap-8 rounded-b-none rounded-t-2xl bg-white p-8 sm:grid-cols-2 sm:rounded-2xl">
        <div>
          <div>
            <label htmlFor="bill" className="text-sm text-dark-grayish-cyan">
              Bill
            </label>
            <div className="relative mt-1 sm:mt-2">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <DollarIcon />
              </div>
              <input
                name="bill"
                id="bill"
                type="number"
                step="any"
                min={1}
                className="w-full rounded-md border-0 bg-very-light-grayish-cyan px-4 py-1 text-right leading-10 text-very-dark-cyan placeholder:text-grayish-cyan invalid:ring-2 invalid:ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-inset focus:ring-strong-cyan [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0"
                onChange={onBillAmontChange}
              />
            </div>
          </div>
          <div className="mt-6 sm:mt-8">
            <label className="text-sm text-dark-grayish-cyan">
              Select Tip %
            </label>
            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {btnList.map((btn, idx) => {
                return (
                  <button
                    className={`${
                      activeButton === idx
                        ? "bg-strong-cyan text-very-dark-cyan"
                        : "bg-very-dark-cyan text-white"
                    } rounded-md py-2 text-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-strong-cyan`}
                    key={idx}
                    onClick={() => {
                      setTipPct(btn.value);
                      setActiveButton(idx);
                    }}
                  >
                    {btn.label}
                  </button>
                );
              })}
              <input
                id="custom"
                type="number"
                step="any"
                min={1}
                max={100}
                className="rounded-md border-0 bg-very-light-grayish-cyan px-4 py-2 text-right text-xl text-dark-grayish-cyan placeholder:text-dark-grayish-cyan invalid:ring-2 invalid:ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-inset focus:ring-strong-cyan [&::-webkit-inner-spin-button]:appearance-none"
                onClick={() => {
                  setActiveButton(null);
                  setTipPct(0);
                }}
                onChange={onCustomTipPctChange}
                placeholder="Custom"
              />
            </div>
          </div>
          <div className="relative mt-8">
            <label
              htmlFor="numpeople"
              className="text-sm text-dark-grayish-cyan"
            >
              Number of People
            </label>
            <div className="peer relative mt-2">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <PersonIcon />
              </div>
              <input
                name="numpeople"
                id="numpeople"
                min={1}
                type="number"
                step="any"
                className="w-full rounded-md border-0 bg-very-light-grayish-cyan px-4 py-1 text-right leading-10 text-very-dark-cyan placeholder:text-grayish-cyan invalid:ring-2 invalid:ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-inset focus:ring-strong-cyan [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0"
                onChange={onPeopleNumChange}
              />
            </div>
            <span className="hidden text-sm text-red-400 peer-has-[:invalid]:absolute peer-has-[:invalid]:right-0 peer-has-[:invalid]:top-[2px] peer-has-[:invalid]:block">
              Can&apos;t be zero
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-y-4 rounded-lg bg-very-dark-cyan px-4 py-6 sm:p-8">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-white sm:text-base">
                Tip Amount
              </span>
              <span className="mt-1 text-xs text-grayish-cyan sm:text-sm">
                / person
              </span>
            </div>
            <div className="text-xl text-strong-cyan sm:text-4xl">
              {billAmount !== 0 && tipPct !== 0 && peopleNum !== 0
                ? "$" + calculateTipPerPerson()
                : "$0.00"}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-white sm:text-base">Total</span>
              <span className="mt-1 text-xs text-grayish-cyan sm:text-sm">
                / person
              </span>
            </div>
            <div className="text-xl text-strong-cyan sm:text-4xl">
              {billAmount !== 0 && tipPct !== 0 && peopleNum !== 0
                ? "$" + calculateTotalPerPerson()
                : "$0.00"}
            </div>
          </div>
          <button
            className="w-full rounded-md bg-strong-cyan p-2 hover:bg-light-grayish-cyan disabled:bg-strong-cyan/30 disabled:text-grayish-cyan/40 sm:py-2.5"
            onClick={resetStates}
            disabled={billAmount === 0 || peopleNum === 0 || tipPct === 0}
          >
            RESET
          </button>
        </div>
      </div>
    </main>
  );
}
