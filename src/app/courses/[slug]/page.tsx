import React from 'react';
import { notFound } from 'next/navigation';
import { coursesData } from '@/data/coursesData';
import { CourseDetailView } from '@/components/CourseDetailView';

export function generateStaticParams() {
  return coursesData.map((course) => ({
    slug: course.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = coursesData.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  return <CourseDetailView course={course} />;
}

