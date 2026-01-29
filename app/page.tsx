import { HeroSection } from '@/components/landing/HeroSection';
import { StatsRow } from '@/components/landing/StatsRow';
import { HowItWorks } from '@/components/landing/HowItWorks';

export default function HomePage() {
    return (
        <div>
            <HeroSection />
            <StatsRow />
            <HowItWorks />
        </div>
    );
}
