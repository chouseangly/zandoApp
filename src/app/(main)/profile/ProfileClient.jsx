"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext"; // ✅ IMPORT
import { useTheme } from "@/context/ThemeContext"; // ✅ IMPORT

// Simple dictionary for translations
const translations = {
  en: {
    profile: "Profile",
    loyaltyMember: "Loyalty Member",
    membershipBenefits: "Membership & Benefits",
    me: "Me",
    myOrders: "My orders",
    giftCard: "Gift Card",
    addressBook: "Address book",
    changePassword: "Change password",
    languages: "Languages",
    english: "English",
    khmer: "ខ្មែរ",
    shopPreference: "Shop Preference",
    women: "Women",
    men: "Men",
    boys: "Boys",
    girls: "Girls",
    support: "Support",
    privacyPolicy: "Privacy Policy",
    faqsGuides: "FAQs & guides",
    settings: "Settings",
    darkMode: "Dark Mode",
    logOut: "Log out",
    gender: "Gender (Required)",
    male: "Male",
    female: "Female",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    mobileNumber: "Mobile number",
    dob: "Date of birth (DD/MM/YYYY)",
    dobReward: "Add your birthday to unlock additional offering/reward!",
    update: "Update",
  },
  km: {
    profile: "ប្រវត្តិរូប",
    loyaltyMember: "សមាជិក",
    membershipBenefits: "សមាជិកភាព និងអត្ថប្រយោជន៍",
    me: "ខ្ញុំ",
    myOrders: "ការបញ្ជាទិញរបស់ខ្ញុំ",
    giftCard: "កាត​អំណោយ",
    addressBook: "សៀវភៅ​អាសយដ្ឋាន",
    changePassword: "ផ្លាស់ប្តូរ​លេខសម្ងាត់",
    languages: "ភាសា / Languages",
    english: "English",
    khmer: "ខ្មែរ",
    shopPreference: "ចំណូលចិត្តហាង",
    women: "ស្ត្រី",
    men: "បុរស",
    boys: "ក្មេងប្រុស",
    girls: "ក្មេងស្រី",
    support: "ជំនួយ",
    privacyPolicy: "គោលការណ៍​ភាព​ឯកជន",
    faqsGuides: "សំណួរគេសួរញឹកញាប់ និងការណែនាំ",
    settings: "ការកំណត់",
    darkMode: " Dark Mode",
    logOut: "ចាកចេញ",
    gender: "ភេទ (ចាំបាច់)",
    male: "ប្រុស",
    female: "ស្រី",
    firstName: "នាមខ្លួន",
    lastName: "នាមត្រកូល",
    email: "អ៊ីមែល",
    mobileNumber: "លេខទូរស័ព្ទ",
    dob: "ថ្ងៃខែ​ឆ្នាំ​កំណើត (DD/MM/YYYY)",
    dobReward: "បន្ថែមថ្ងៃកំណើតរបស់អ្នកដើម្បីទទួលបានរង្វាន់បន្ថែម!",
    update: "ធ្វើ​ឱ្យ​ទាន់សម័យ",
  }
};

const ProfileClient = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const { language, setLanguage } = useLanguage(); // ✅ GET language context
  const { theme, toggleTheme } = useTheme(); // ✅ GET theme context
  const t = translations[language]; // ✅ GET current translation

  const [formData, setFormData] = useState({ /* ... */ });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && session) {
      setFormData({
        firstName: session.user.firstName || '',
        lastName: session.user.lastName || '',
        email: session.user.email || '',
        mobileNumber: '',
        dob: '',
        gender: ''
      });
    }
  }, [status, session, router]);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
  };
  
  if (status === "loading" || !session) {
    return <div className="text-center py-20">Loading...</div>;
  }
  
  const SidebarLink = ({ name, tabName }) => (
    <button 
      onClick={() => setActiveTab(tabName)}
      className={`w-full text-left px-4 py-2 rounded-md flex justify-between items-center ${activeTab === tabName ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
    >
      {name}
      <ChevronRight size={16} className="text-gray-400" />
    </button>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
        
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-2">{t.loyaltyMember}</h3>
              <SidebarLink name={t.membershipBenefits} tabName="membership" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">{t.me}</h3>
              <SidebarLink name={t.profile} tabName="profile" />
              <SidebarLink name={t.myOrders} tabName="orders" />
              <SidebarLink name={t.giftCard} tabName="giftcard" />
              <SidebarLink name={t.addressBook} tabName="address" />
              <SidebarLink name={t.changePassword} tabName="password" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">{t.languages}</h3>
              <div className="pl-4 space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="language" value="en" checked={language === 'en'} onChange={() => setLanguage('en')} className="h-4 w-4 text-black border-gray-300 focus:ring-black"/>
                  <span className="ml-2">{t.english}</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="language" value="km" checked={language === 'km'} onChange={() => setLanguage('km')} className="h-4 w-4 text-black border-gray-300 focus:ring-black"/>
                  <span className="ml-2">{t.khmer}</span>
                </label>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">{t.settings}</h3>
              <div className="pl-4 flex items-center justify-between">
                <span>{t.darkMode}</span>
                <button onClick={toggleTheme} className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors ${theme === 'dark' ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'}`}>
                  <span className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform"></span>
                </button>
              </div>
            </div>
            <div className="pt-4">
                <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full text-center px-4 py-3 rounded-md bg-black text-white font-semibold hover:bg-gray-800 dark:hover:bg-gray-700">
                  {t.logOut}
                </button>
            </div>
          </div>
        </aside>

        <main className="w-full md:w-3/4 lg:w-4/5">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">{t.profile}</h2>
              <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                 <div>
                    <label className="block text-sm font-medium mb-2">{t.gender}</label>
                    <div className="flex items-center gap-6">
                        <label className="flex items-center"><input type="radio" name="gender" value="male" className="h-4 w-4"/> <span className="ml-2">{t.male}</span></label>
                        <label className="flex items-center"><input type="radio" name="gender" value="female" className="h-4 w-4"/> <span className="ml-2">{t.female}</span></label>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium">{t.firstName}</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">{t.lastName}</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium">{t.email}</label>
                    <input type="email" name="email" value={formData.email} disabled className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-200 dark:bg-gray-600 cursor-not-allowed"/>
                </div>
                <div>
                    <label className="block text-sm font-medium">{t.mobileNumber}</label>
                    <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"/>
                </div>
                <div>
                    <label className="block text-sm font-medium">{t.dob}</label>
                    <input type="text" name="dob" value={formData.dob} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"/>
                    <p className="mt-2 text-sm text-green-600">{t.dobReward}</p>
                </div>
                <button type="submit" className="w-full sm:w-auto px-10 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800">{t.update}</button>
              </form>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default ProfileClient;