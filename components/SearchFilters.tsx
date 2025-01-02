"use client"

import { useState } from "react"
// import { motion } from "framer-motion"
import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"

export interface Filters {
  search: string
  difficulties: string[]
  minAcceptance: number
  minFrequency: number
  sortBy: 'frequency' | 'acceptance' | 'title'
  sortOrder: 'asc' | 'desc'
}

interface SearchFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export default function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const updateFilters = (updates: Partial<Filters>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const toggleDifficulty = (difficulty: string) => {
    const currentDifficulties = Array.isArray(filters.difficulties) ? filters.difficulties : [];
    const updatedDifficulties = currentDifficulties.includes(difficulty)
      ? currentDifficulties.filter(d => d !== difficulty)
      : [...currentDifficulties, difficulty]
    updateFilters({ difficulties: updatedDifficulties })
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="pl-8"
          />
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Adjust filters to find specific questions
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty</label>
                <div className="flex flex-col space-y-2">
                  {['Easy', 'Medium', 'Hard'].map((difficulty) => (
                    <label key={difficulty} className="flex items-center space-x-2">
                      <Checkbox
                        checked={Array.isArray(filters.difficulties) && filters.difficulties.includes(difficulty)}
                        onCheckedChange={() => toggleDifficulty(difficulty)}
                      />
                      <span>{difficulty}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Minimum Acceptance Rate: {filters.minAcceptance}%
                </label>
                <Slider
                  value={[filters.minAcceptance]}
                  onValueChange={([value]) => updateFilters({ minAcceptance: value })}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Minimum Frequency: {filters.minFrequency}%
                </label>
                <Slider
                  value={[filters.minFrequency]}
                  onValueChange={([value]) => updateFilters({ minFrequency: value })}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value: Filters['sortBy']) => updateFilters({ sortBy: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frequency">Frequency</SelectItem>
                    <SelectItem value="acceptance">Acceptance Rate</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sort Order</label>
                <Select
                  value={filters.sortOrder}
                  onValueChange={(value: Filters['sortOrder']) => updateFilters({ sortOrder: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Descending</SelectItem>
                    <SelectItem value="asc">Ascending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

