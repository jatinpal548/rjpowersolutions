import Navbar from '@/components/layout/Navbar';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import LeadPopup from '@/components/ui/LeadPopup';
import Footer from '@/components/layout/Footer';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen overflow-x-hidden">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <LeadPopup />
    </>
  );
}
