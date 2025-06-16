"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface NumberInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  prefix?: string
  suffix?: string
}

export default function NumberInput({ label, value, onChange, placeholder, prefix, suffix }: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    // Allow empty string, numbers, and decimal points
    if (inputValue === "" || /^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue)
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={label} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </Label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">
            {prefix}
          </span>
        )}
        <Input
          id={label}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`${prefix ? "pl-8" : ""} ${suffix ? "pr-8" : ""} 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 
            text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
            transition-colors duration-200`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}
