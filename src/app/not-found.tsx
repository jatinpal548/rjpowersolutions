import Link from 'next/link';
import { Sun, ArrowRight } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center bg-solar-grey pt-20">
        <div className="text-center max-w-lg px-6">
          <div className="text-8xl mb-6">☀️</div>
          <h1 className="font-poppins font-extrabold text-6xl text-solar-orange mb-4">404</h1>
          <h2 className="font-poppins font-bold text-2xl text-solar-dark mb-4">Page Not Found</h2>
          <p className="text-gray-500 mb-8 text-lg">
            Oops! This page seems to be off the grid. Let&apos;s get you back to solar-powered territory.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn-primary">
              <Sun size={18} /> Back to Home
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
