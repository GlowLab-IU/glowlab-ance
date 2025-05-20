"use client";

import React, { ReactElement, ReactNode, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
interface TabsInjectedProps {
  activeValue?: string;
  setActiveValue?: React.Dispatch<React.SetStateAction<string>>;
}

type TabsProps = {
  children: ReactElement<TabsInjectedProps> | ReactElement<TabsInjectedProps>[];
  defaultValue?: string;
  className?: string;
};

type TabsListProps = {
  children: ReactNode;
  className?: string;
};

type TabsTriggerProps = {
  value: string;
  children: ReactNode;
  activeValue?: string;
  setActiveValue?: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
};

type TabsContentProps = {
  value: string;
  activeValue?: string;
  setActiveValue?: React.Dispatch<React.SetStateAction<string>>;
  children: ReactNode;
  className?: string;
};

export function Tabs({ children, defaultValue, className }: TabsProps) {
  const [activeValue, setActiveValue] = useState(defaultValue || "");

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement<TabsInjectedProps>(child)) return null;

        return React.cloneElement<TabsInjectedProps>(child, {
          activeValue,
          setActiveValue,
        });
      })}
    </div>
  );
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={className}
      style={{ display: "flex", gap: 10 }}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  activeValue,
  setActiveValue,
  className,
}: TabsTriggerProps) {
  const isActive = activeValue === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveValue && setActiveValue(value)}
      className={className}
      style={{
        padding: "8px 16px",
        cursor: "pointer",
        borderBottom: isActive ? "2px solid blue" : "2px solid transparent",
        background: "none",
        border: "none",
      }}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  activeValue,
  children,
  className,
}: TabsContentProps) {
  if (!activeValue || value !== activeValue) return null;

  return (
    <div role="tabpanel" className={className}>
      {children}
    </div>
  );
}
