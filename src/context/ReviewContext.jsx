import { createContext, useContext, useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'

const ReviewContext = createContext()

const initialReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2024-03-15",
    comment: "This file sharing service is incredibly easy to use. The drag and drop feature makes uploading files a breeze!",
    status: "approved",
    avatar: "https://bit.ly/sarah-johnson"
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 4,
    date: "2024-03-14",
    comment: "Great service! The security features give me peace of mind when sharing sensitive documents.",
    status: "pending",
    avatar: "https://bit.ly/michael-chen"
  }
]

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('reviews')
    return savedReviews ? JSON.parse(savedReviews) : initialReviews
  })
  const toast = useToast()

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews))
  }, [reviews])

  const addReview = (newReview) => {
    const review = {
      ...newReview,
      id: Date.now(),
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      avatar: `https://bit.ly/${newReview.name.toLowerCase().replace(/\s+/g, '-')}`
    }
    setReviews(prevReviews => [review, ...prevReviews])
    toast({
      title: "Review submitted",
      description: "Your review is pending approval",
      status: "success",
      duration: 3000,
    })
  }

  const deleteReview = (id) => {
    setReviews(prevReviews => prevReviews.filter(review => review.id !== id))
    toast({
      title: "Review deleted",
      status: "success",
      duration: 3000,
    })
  }

  const updateReviewStatus = (id, newStatus) => {
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
  }

  const updateReview = (id, updatedData) => {
    setReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === id 
          ? { 
              ...review, 
              ...updatedData,
              avatar: `https://bit.ly/${updatedData.name.toLowerCase().replace(/\s+/g, '-')}`
            }
          : review
      )
    )
    toast({
      title: "Review updated",
      status: "success",
      duration: 3000,
    })
  }

  const value = {
    reviews,
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