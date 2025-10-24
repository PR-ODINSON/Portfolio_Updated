// EmailJS configuration for contact form
import emailjs from '@emailjs/browser'

// Initialize EmailJS with your public key
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_default'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_default'
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key'

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY)

// Contact API using EmailJS
export const contactAPI = {
  sendMessage: async (data: {
    name: string
    email: string
    subject: string
    message: string
  }) => {
    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_name: 'Prithviraj Verma',
      }

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      )

      return {
        success: true,
        message: 'Thank you for your message! I will get back to you soon.',
        messageId: response.text
      }
    } catch (error) {
      console.error('EmailJS Error:', error)
      throw new Error('Failed to send message. Please try again later.')
    }
  }
}
