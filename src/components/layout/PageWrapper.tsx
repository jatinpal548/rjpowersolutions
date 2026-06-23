import Navbar from '@/components/layout/Navbar';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import StickyCallButton from '@/components/ui/StickyCallButton';
import LeadPopup from '@/components/ui/LeadPopup';
import Footer from '@/components/layout/Footer';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <StickyCallButton />
      <LeadPopup />
    </>
  );
}
