import Link from "next/link";
import { Mail, Phone, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function TopBar() {
    return (
        <div className="bg-primary-950 text-white/80 text-xs py-2 border-b border-white/10 hidden md:block">
            <div className="container-custom flex justify-between items-center">
                <div className="flex items-center gap-6">
                    <Link href="mailto:info@aladl-law.com" className="flex items-center gap-2 hover:text-gold-500 transition-colors">
                        <Mail size={14} className="text-gold-500" />
                        <span>info@aladl-law.com</span>
                    </Link>
                    <Link href="tel:+96812345678" className="flex items-center gap-2 hover:text-gold-500 transition-colors">
                        <Phone size={14} className="text-gold-500" />
                        <span>+968 1234 5678</span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="#" className="hover:text-gold-500 transition-colors"><Facebook size={16} /></Link>
                    <Link href="#" className="hover:text-gold-500 transition-colors"><Twitter size={16} /></Link>
                    <Link href="#" className="hover:text-gold-500 transition-colors"><Instagram size={16} /></Link>
                    <Link href="#" className="hover:text-gold-500 transition-colors"><Linkedin size={16} /></Link>
                </div>
            </div>
        </div>
    );
}
