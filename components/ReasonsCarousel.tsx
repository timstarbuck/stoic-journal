'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const reasons = [
  {
    id: 1,
    title: 'Gain Clarity in Chaos',
    description:
      'By writing down thoughts and experiences, one can focus on what is truly important and prioritize accordingly.',
  },
  {
    id: 2,
    title: 'Build Emotional Resilience',
    description:
      'Journaling allows individuals to process emotions and develop better emotional regulation, leading to reduced stress and anxiety.',
  },
  {
    id: 3,
    title: 'Strengthen Self-Awareness',
    description:
      'Regular reflection in a journal can enhance self-awareness, helping individuals align their actions with Stoic virtues.',
  },
  {
    id: 4,
    title: 'Improve Decision-Making',
    description:
      'Reflecting on choices and actions can lead to more rational and informed decision-making.',
  },
  {
    id: 5,
    title: 'Cultivate Gratitude',
    description:
      'By acknowledging and reflecting on positive aspects of life, one can cultivate a sense of gratitude and contentment.',
  },
  {
    id: 6,
    title: 'Enhance Mindfulness and Presence',
    description:
      'Journaling encourages mindfulness, helping individuals to live with intention instead of autopilot.',
  },
  {
    id: 7,
    title: 'Develop Consistency and Discipline',
    description:
      'Regular journaling can help individuals develop consistency and discipline in their practice of Stoicism.',
  },
];

export default function ReasonsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reasons.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reasons.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentReason = reasons[currentIndex];

  return (
    <div className="mb-16">
      {/* Carousel Container */}
      <div className="relative">
        <Card className="border-0 shadow bg-linear-to-br from-slate-700 to-slate-800 dark:from-slate-800 dark:to-slate-900">
          <CardContent className="pt-12 pb-12 min-h-64">
            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {currentReason.title}
              </h2>
              <p className="text-lg text-slate-200 max-w-2xl">
                {currentReason.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 p-2 rounded-full bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 transition-colors"
          aria-label="Previous reason"
        >
          <svg
            className="w-6 h-6 text-slate-900 dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 p-2 rounded-full bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 transition-colors"
          aria-label="Next reason"
        >
          <svg
            className="w-6 h-6 text-slate-900 dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {reasons.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-slate-700 dark:bg-slate-300 w-8'
                : 'bg-slate-400 dark:bg-slate-600 w-3 hover:bg-slate-500 dark:hover:bg-slate-500'
            }`}
            aria-label={`Go to reason ${index + 1}`}
            aria-current={index === currentIndex}
          />
        ))}
      </div>

      {/* Reason Counter */}
      <p className="text-center mt-6 text-sm text-slate-600 dark:text-slate-400">
        {currentIndex + 1} of {reasons.length}
      </p>

      {/* Summary Text */}
      <div className="mt-12 text-center px-4">
        <p className="text-slate-700 dark:text-slate-300">
          Stoic journaling is a simple yet powerful practice that can transform
          both the mindset and daily life of an individual. It is a tool for
          self-reflection and personal growth that can lead to greater
          well-being and resilience.
        </p>
      </div>
    </div>
  );
}
