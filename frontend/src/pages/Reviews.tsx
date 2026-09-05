import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Review } from '../utils/mockData';
import { SectionTitle } from '../components/SectionTitle';
import { ReviewCard } from '../components/ReviewCard';
import { Star, MessageSquarePlus, Check } from 'lucide-react';

export const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.getReviews();
        setReviews(res.filter(r => r.approved !== false));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !business || !review) return;
    setFormLoading(true);
    try {
      const createdReview = await api.createReview({
        name,
        business,
        rating,
        review,
        image: '',
        approved: true
      });

      // Instantly add to state so user sees their review on the web page immediately!
      setReviews(prev => [createdReview, ...prev]);

      setSuccess(true);
      setName('');
      setBusiness('');
      setReview('');
      setRating(5);
      setTimeout(() => setSuccess(false), 8000);
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Hero */}
      <section className="studio-container pt-12 text-center max-w-4xl space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan bg-accent-cyan/10 px-3.5 py-1.5 rounded border border-accent-cyan/20">// VERIFIED FEEDBACK</span>
        <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-studio-white leading-tight">
          Client Reviews
        </h1>
        <p className="text-base sm:text-lg text-studio-text max-w-2xl mx-auto leading-relaxed font-sans">
          Don't just take our word for it. Read the verified reviews and feedback left by our clients across healthcare, retail, and tech industries.
        </p>
      </section>

      {/* Grid of reviews */}
      <section className="studio-container">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-60 bg-studio-card border border-studio-border animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <ReviewCard
                key={rev._id}
                name={rev.name}
                business={rev.business}
                rating={rev.rating}
                review={rev.review}
                image={rev.image}
              />
            ))}
            {reviews.length === 0 && (
              <div className="col-span-full text-center py-12 bg-studio-card border border-studio-border rounded">
                <p className="text-studio-text text-sm">No reviews published yet.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Review Submission Form */}
      <section className="studio-container max-w-2xl">
        <div className="bg-studio-card border border-studio-border p-8 rounded-lg space-y-6">
          <div className="flex items-center gap-3 border-b border-studio-border/50 pb-4">
            <MessageSquarePlus className="text-accent-cyan" size={24} />
            <h3 className="text-xl font-display font-bold text-studio-white uppercase">Share Your Experience</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs uppercase font-mono text-studio-text font-bold">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aditya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-studio-black border border-studio-border px-4 py-2.5 rounded text-sm text-studio-white focus:outline-none focus:border-accent-cyan transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase font-mono text-studio-text font-bold">Company / Business</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dream Avenue Clinic"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  className="w-full bg-studio-black border border-studio-border px-4 py-2.5 rounded text-sm text-studio-white focus:outline-none focus:border-accent-cyan transition-colors"
                />
              </div>
            </div>

            {/* Rating Star Selection */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-mono text-studio-text font-bold block">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-studio-text hover:text-yellow-500 transition-colors"
                    aria-label={`Select ${star} stars`}
                  >
                    <Star
                      size={20}
                      className={star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-studio-border'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase font-mono text-studio-text font-bold">Your Review</label>
              <textarea
                required
                rows={4}
                placeholder="Share detail inputs about the project design, communication, coding speed..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full bg-studio-black border border-studio-border px-4 py-2.5 rounded text-sm text-studio-white focus:outline-none focus:border-accent-cyan transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={formLoading}
              className="w-full bg-accent-indigo hover:bg-indigo-700 text-white py-3 rounded font-semibold text-xs uppercase tracking-widest transition-all"
            >
              {formLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>

          {success && (
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded flex items-center gap-3 text-sm text-green-400">
              <Check size={18} className="flex-shrink-0" />
              <span>Thank you! Your review has been submitted and published live on the website. Scroll up to view it!</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
