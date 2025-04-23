import { createContext, useContext, useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { supabase } from '../services/supabase'

const ReviewContext = createContext()

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  // Fetch reviews from Supabase
  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setReviews(data || [])
    } catch (error) {
      console.error('Error fetching reviews:', error)
      toast({
        title: "Error fetching reviews",
        description: error.message,
        status: "error",
        duration: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  const addReview = async (newReview) => {
    try {
      // Validate rating
      const rating = parseInt(newReview.rating)
      if (isNaN(rating) || rating < 1 || rating > 5) {
        throw new Error('Rating must be between 1 and 5')
      }

      const review = {
        name: newReview.name.trim(),
        rating: rating,
        comment: newReview.comment.trim(),
        status: 'pending',
        avatar: `https://bit.ly/${newReview.name.toLowerCase().trim().replace(/\s+/g, '-')}`
        // created_at will be set by Supabase default value
      }

      const { data, error } = await supabase
        .from('reviews')
        .insert([review])
        .select()

      if (error) throw error

      setReviews(prevReviews => [data[0], ...prevReviews])
      toast({
        title: "Review submitted",
        description: "Your review is pending approval",
        status: "success",
        duration: 3000,
      })
    } catch (error) {
      console.error('Error adding review:', error)
      toast({
        title: "Error submitting review",
        description: error.message,
        status: "error",
        duration: 3000,
      })
    }
  }

  const deleteReview = async (id) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id)

      if (error) throw error

      setReviews(prevReviews => prevReviews.filter(review => review.id !== id))
      toast({
        title: "Review deleted",
        status: "success",
        duration: 3000,
      })
    } catch (error) {
      console.error('Error deleting review:', error)
      toast({
        title: "Error deleting review",
        description: error.message,
        status: "error",
        duration: 3000,
      })
    }
  }

  const updateReviewStatus = async (id, newStatus) => {
    try {
      if (!['pending', 'approved'].includes(newStatus)) {
        throw new Error('Invalid status value')
      }

      const { error } = await supabase
        .from('reviews')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error

      setReviews(prevReviews => 
        prevReviews.map(review =>
          review.id === id 
            ? { ...review, status: newStatus }
            : review
        )
      )
      toast({
        title: `Review ${newStatus}`,
        status: "success",
        duration: 3000,
      })
    } catch (error) {
      console.error('Error updating review status:', error)
      toast({
        title: "Error updating review",
        description: error.message,
        status: "error",
        duration: 3000,
      })
    }
  }

  const updateReview = async (id, updatedData) => {
    try {
      // Validate rating
      const rating = parseInt(updatedData.rating)
      if (isNaN(rating) || rating < 1 || rating > 5) {
        throw new Error('Rating must be between 1 and 5')
      }

      const update = {
        name: updatedData.name.trim(),
        rating: rating,
        comment: updatedData.comment.trim(),
        avatar: `https://bit.ly/${updatedData.name.toLowerCase().trim().replace(/\s+/g, '-')}`
      }

      const { error } = await supabase
        .from('reviews')
        .update(update)
        .eq('id', id)

      if (error) throw error

      setReviews(prevReviews =>
        prevReviews.map(review =>
          review.id === id 
            ? { ...review, ...update }
            : review
        )
      )
      toast({
        title: "Review updated",
        status: "success",
        duration: 3000,
      })
    } catch (error) {
      console.error('Error updating review:', error)
      toast({
        title: "Error updating review",
        description: error.message,
        status: "error",
        duration: 3000,
      })
    }
  }

  const value = {
    reviews,
    loading,
    addReview,
    deleteReview,
    updateReviewStatus,
    updateReview,
    approvedReviews: reviews.filter(review => review.status === 'approved')
  }

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  )
}

export const useReviews = () => {
  const context = useContext(ReviewContext)
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider')
  }
  return context
} 