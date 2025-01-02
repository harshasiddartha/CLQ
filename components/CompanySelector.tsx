"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CompanySelectorProps {
  companies: string[];
  selectedCompany: string;
  onCompanyChange: (company: string) => void;
}

export default function CompanySelector({
  companies,
  selectedCompany,
  onCompanyChange
}: CompanySelectorProps) {
  return (
    <Select value={selectedCompany} onValueChange={onCompanyChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select company" />
      </SelectTrigger>
      <SelectContent>
        {companies.map((company) => (
          <SelectItem key={company} value={company}>
            {company.charAt(0).toUpperCase() + company.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

