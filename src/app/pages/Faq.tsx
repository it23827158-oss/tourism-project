import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { CircleHelp, ShieldCheck, PlaneTakeoff, CreditCard } from 'lucide-react';

const faqItems = [
  {
    question: 'How do I book a trip with SL Traveler?',
    answer:
      'Browse destinations, choose your preferred package, and click Book Now. You can then review your trip details, add travelers, and complete checkout securely.',
    icon: PlaneTakeoff,
  },
  {
    question: 'Can I customize my tour or itinerary?',
    answer:
      'Yes. Our trip planner lets you choose destinations, travel dates, activities, accommodation style, and budget preferences so we can tailor the experience to your needs.',
    icon: CircleHelp,
  },
  {
    question: 'Are payments secure?',
    answer:
      'Absolutely. Payments are processed through secure checkout flows, and we only collect the information needed to finalize your booking safely and transparently.',
    icon: CreditCard,
  },
  {
    question: 'Do you offer support during the trip?',
    answer:
      'Yes. Our team is available to help before, during, and after your trip. You can contact our support team through the contact section or your booking details.',
    icon: ShieldCheck,
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'Cancellation terms depend on the package and provider. We recommend checking the booking details for each trip, and our support team can guide you through any cancellation requests.',
    icon: CircleHelp,
  },
  {
    question: 'Can I book for a group or family trip?',
    answer:
      'Definitely. You can select the number of travelers in the planner and tailor the itinerary for your group, including family-friendly and multi-person travel arrangements.',
    icon: PlaneTakeoff,
  },
];

export default function Faq() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary via-sky-500 to-secondary py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-white/10 text-white border-white/20 hover:bg-white/15">
            Help Center
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Everything you need to know before planning your next unforgettable journey in Sri Lanka.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-6">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map(({ question, answer, icon: Icon }) => (
              <AccordionItem
                key={question}
                value={question}
                className="rounded-2xl border border-border bg-card shadow-sm px-4"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 text-base md:text-lg text-foreground">
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    {question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-7 text-muted-foreground">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 rounded-3xl border border-border bg-gradient-to-r from-primary/5 to-secondary/5 p-6 md:p-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-3">Still have questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our travel specialists are ready to help you plan the perfect getaway.
          </p>
          <a
            href="mailto:hello@sltraveler.lk"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
