"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string | string[];
  onChange: (value: any) => void;
  multiple?: boolean;
  placeholder?: string;
  className?: string;
}

export function CustomSelect({ options, value, onChange, multiple = false, placeholder = "Select...", className }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.includes(optionValue)) {
        onChange(currentValues.filter(v => v !== optionValue));
      } else {
        onChange([...currentValues, optionValue]);
      }
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const getDisplayValue = () => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.length === 0) return placeholder;
      if (currentValues.length === 1) return options.find(o => o.value === currentValues[0])?.label;
      return `${currentValues.length} selected`;
    }
    if (!value) return placeholder;
    return options.find(o => o.value === value)?.label || placeholder;
  };

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full bg-bg-surface border-3 border-border rounded-xl px-5 py-3.5 md:py-4 text-[10px] md:text-xs font-black uppercase tracking-widest text-text-primary flex items-center justify-between transition-all focus:outline-none focus:border-accent hover:shadow-[4px_4px_0_var(--color-border)]",
          isOpen && "border-accent shadow-[4px_4px_0_var(--color-accent)]"
        )}
      >
        <span className={cn(
          "truncate pr-4",
          (!value || (multiple && value.length === 0)) ? "text-text-secondary" : "text-text-primary"
        )}>
          {getDisplayValue()}
        </span>
        <ChevronDown className={cn("w-4 h-4 md:w-5 md:h-5 text-text-secondary transition-transform shrink-0", isOpen && "rotate-180 text-accent")} />
      </button>

      {isOpen && (
        <div className="absolute z-[100] w-full mt-3 bg-bg-surface border-4 border-bg-dark rounded-2xl shadow-[6px_6px_0_#09090b] overflow-hidden max-h-[60vh] md:max-h-80 overflow-y-auto no-scrollbar">
          {options.map((option) => {
            const isSelected = multiple 
              ? (Array.isArray(value) && value.includes(option.value))
              : value === option.value;
              
            return (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "px-5 py-4 md:py-5 text-[10px] md:text-xs font-black uppercase tracking-widest cursor-pointer transition-colors flex items-center justify-between border-b-2 border-border last:border-0",
                  isSelected ? "bg-accent text-[#09090b]" : "text-text-secondary hover:bg-bg-base hover:text-text-primary"
                )}
              >
                <span className="truncate pr-4">{option.label}</span>
                {isSelected && <Check className="w-4 h-4 md:w-5 md:h-5 text-[#09090b] stroke-[4px]" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
