"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Search, Mic, Image, Link, X, Languages, ChevronRight, ChevronLeft, Moon, Sun, User2, Check } from 'lucide-react';
import { useTheme } from 'next-themes';
import { SignedIn, SignedOut, UserButton, SignUpButton } from '@clerk/nextjs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useGenre } from '@/contexts/GenreContext';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isUrlMode, setIsUrlMode] = useState(false);
  const { activeTab, setActiveTab } = useGenre();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const { theme, setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
  ];

  const newsGenres = [
    'All',
    'Politics',
    'Technology',
    'Business',
    'Sports',
    'Entertainment',
    'Science',
    'Health',
    'World',
    'Local',
    'Opinion',
    'Economy',
    'Environment',
    'Education',
    'Culture',
  ];

  const specialTabs = [
    'Recently uploaded',
    'Watched',
    'New to You',
  ];

  const allTabs = [...newsGenres, ...specialTabs];

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === 'light' || theme === 'system') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const isLight = theme === 'light' || theme === 'system';

  // Check if input is a URL
  useEffect(() => {
    const urlPattern = /^(https?:\/\/|www\.)/i;
    setIsUrlMode(urlPattern.test(searchQuery.trim()));
  }, [searchQuery]);

  // Handle tabs scroll
  useEffect(() => {
    const container = tabsContainerRef.current;
    if (!container) return;

    const checkScrollButtons = () => {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    };

    checkScrollButtons();
    container.addEventListener('scroll', checkScrollButtons);
    window.addEventListener('resize', checkScrollButtons);

    return () => {
      container.removeEventListener('scroll', checkScrollButtons);
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, []);

  const scrollTabs = (direction: 'left' | 'right') => {
    const container = tabsContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    const newPosition =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth',
    });
  };

  // Initialize Web Speech API for voice search
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
        handleSearch(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleSearch = (query?: string) => {
    const searchTerm = query || searchQuery.trim();
    if (searchTerm) {
      console.log('Searching for:', searchTerm);
      // Implement your search logic here
      // You can call your API endpoint here
      fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword: searchTerm }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Search results:', data);
          // Handle search results
        })
        .catch((err) => {
          console.error('Search error:', err);
        });
    }
  };

  const handleVoiceSearch = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleImageSearch = () => {
    setShowImageDialog(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Image uploaded:', file.name);
      // Create FormData for image upload
      const formData = new FormData();
      formData.append('image', file);
      
      // You can implement image search API call here
      fetch('/api/search/image', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Image search results:', data);
          setShowImageDialog(false);
        })
        .catch((err) => {
          console.error('Image search error:', err);
        });
    }
  };

  const handleUrlSearch = () => {
    const url = searchQuery.trim();
    if (url) {
      // Check if it's a valid URL
      try {
        const urlToOpen = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
        new URL(urlToOpen);
        console.log('Searching URL:', urlToOpen);
        // Navigate to URL or implement URL search logic
        window.open(urlToOpen, '_blank');
      } catch {
        // If not a valid URL, treat as regular search
        handleSearch();
      }
    }
  };

  const handleImageUrlSearch = () => {
    if (imageUrl.trim()) {
      console.log('Searching for image URL:', imageUrl);
      // Implement image URL search logic here
      fetch('/api/search/image-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: imageUrl }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Image URL search results:', data);
          setShowImageDialog(false);
          setImageUrl('');
        })
        .catch((err) => {
          console.error('Image URL search error:', err);
        });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        console.log('Image dropped:', file.name);
        const formData = new FormData();
        formData.append('image', file);
        
        fetch('/api/search/image', {
          method: 'POST',
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('Image search results:', data);
            setShowImageDialog(false);
          })
          .catch((err) => {
            console.error('Image search error:', err);
          });
      }
    }
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
        {/* Top Section - Logo and Search */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Truth Sense Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                Truth Sense
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div
                className={`relative bg-white dark:bg-gray-800 rounded-full border transition-all duration-200 ${
                  isFocused ? 'border-gray-300 dark:border-gray-600 shadow-md' : 'border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md'
                } ${isUrlMode ? 'border-blue-500 dark:border-blue-400' : ''}`}
              >
                <div className="flex items-center px-4 py-2">
                  {/* Search Icon */}
                  <Search className="text-gray-400 w-4 h-4 mr-2 flex-shrink-0" />

                  {/* Input Field */}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        if (isUrlMode) {
                          handleUrlSearch();
                        } else {
                          handleSearch();
                        }
                      }
                    }}
                    placeholder="Search anything"
                    className="flex-1 outline-none text-gray-700 dark:text-gray-200 text-sm bg-transparent"
                  />

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 ml-2">
                    {/* Voice Search */}
                    <button
                      type="button"
                      onClick={handleVoiceSearch}
                      className={`p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-150 ${
                        isListening ? 'bg-red-100 dark:bg-red-900/30' : ''
                      }`}
                      title="Search by voice"
                    >
                      <Mic className={`w-4 h-4 ${isListening ? 'text-red-600' : 'text-blue-600'}`} />
                    </button>

                    {/* Image Search */}
                    <button
                      type="button"
                      onClick={handleImageSearch}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-150"
                      title="Check image for fake or misinformation"
                    >
                      <Image className="w-4 h-4 text-blue-600" />
                    </button>

                    {/* URL Search */}
                    <button
                      type="button"
                      onClick={handleUrlSearch}
                      className={`p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-150 ${
                        isUrlMode ? 'bg-blue-100 dark:bg-blue-900/30' : ''
                      }`}
                      title="Search URLs"
                    >
                      <Link className={`w-4 h-4 ${isUrlMode ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`} />
                    </button>
                  </div>
                </div>

                {/* Hidden File Input for Image Upload */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex-shrink-0 flex items-center gap-2">
              {/* Language Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-150"
                    title="Language"
                  >
                    <Languages className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-56 p-2">
                  <div className="space-y-1">
                    <div className="px-2 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Select Language
                    </div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setSelectedLanguage(lang.name)}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                      >
                        <span className="text-gray-700 dark:text-gray-300">{lang.name}</span>
                        {selectedLanguage === lang.name && (
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Light/Dark Mode Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-150"
                title={mounted && isLight ? "Switch to dark mode" : "Switch to light mode"}
              >
                {mounted && isLight ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>

              {/* User Button */}
              <SignedIn>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                />
              </SignedIn>
              <SignedOut>
                <SignUpButton mode="modal">
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-150"
                    title="Sign in"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <User2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </div>
                  </button>
                </SignUpButton>
              </SignedOut>
            </div>
          </div>
        </div>

        {/* Tabs Section - YouTube Style */}
        <div className="relative border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="relative">
            {/* Left Fade Gradient */}
            {showLeftArrow && (
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
            )}

            {/* Right Fade Gradient */}
            {showRightArrow && (
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
            )}

            <div className="container mx-auto px-4">
              <div className="relative flex items-center">
                {/* Left Scroll Arrow */}
                {showLeftArrow && (
                  <button
                    onClick={() => scrollTabs('left')}
                    className="absolute left-0 z-20 h-full px-3 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center shadow-sm"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </button>
                )}

                {/* Tabs Container */}
                <div
                  ref={tabsContainerRef}
                  className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-2.5 px-2 scroll-smooth"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  {allTabs.map((tab) => {
                    const isActive = activeTab === tab;
                    const isSpecialTab = specialTabs.includes(tab);
                    
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
                          px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0
                          ${
                            isActive
                              ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm font-semibold'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }
                          ${isSpecialTab && isActive ? 'ring-2 ring-emerald-400 dark:ring-emerald-300' : ''}
                        `}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>

                {/* Right Scroll Arrow */}
                {showRightArrow && (
                  <button
                    onClick={() => scrollTabs('right')}
                    className="absolute right-0 z-20 h-full px-3 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center shadow-sm"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Image Search Dialog */}
      {showImageDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowImageDialog(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Title */}
            <h2 className="text-gray-900 dark:text-white text-xl font-normal text-center mb-8">
              Check Image for Fake or Misinformation
            </h2>

            {/* Drag and Drop Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-16 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50'
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Image className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-gray-400"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-gray-400"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-gray-400"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-gray-400"></div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-base">
                  Drag an image here or{' '}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-500 hover:underline"
                  >
                    upload a file
                  </button>
                </p>
              </div>
            </div>

            {/* OR Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
              <span className="text-gray-400 dark:text-gray-500 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            </div>

            {/* URL Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleImageUrlSearch();
                  }
                }}
                placeholder="Paste image link to verify"
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                onClick={handleImageUrlSearch}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
