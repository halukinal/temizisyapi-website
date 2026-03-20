"use server"

import { generateFormSummary } from "./geminiActions"

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY

async function saveToFirestore(collection: string, data: any) {
  if (!PROJECT_ID || !API_KEY) {
    console.error("Firebase PROJECT_ID or API_KEY is missing.")
    return false
  }

  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collection}?key=${API_KEY}`
  
  // Firestore REST API expects a specific structure for 'fields'
  const fields: any = {}
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") fields[key] = { stringValue: value }
    else if (typeof value === "boolean") fields[key] = { booleanValue: value }
    else if (typeof value === "number") fields[key] = { doubleValue: value }
    else if (value instanceof Date) fields[key] = { timestampValue: value.toISOString() }
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields })
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error("Firestore REST API Error:", res.status, errorText)
      return false
    }

    return true
  } catch (error) {
    console.error("Firestore Save Error:", error)
    return false
  }
}

export async function submitContactForm(formData: {
  name: string
  phone: string
  email: string
  subject: string
  message: string
  kvkkAccepted: boolean
}) {
  if (!formData.kvkkAccepted) throw new Error("KVKK onayı zorunludur.")

  // 1. AI Analizi
  const { summary, clientFeedback, whatsappMessage } = await generateFormSummary('contact', formData)

  // 2. Firestore'a Kaydet
  const success = await saveToFirestore("messages", {
    type: "contact",
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    subject: formData.subject || "Genel",
    message: formData.message,
    aiSummary: summary,
    aiClientFeedback: clientFeedback,
    aiWhatsAppMessage: whatsappMessage,
    kvkkAccepted: true,
    role: "customer",
    status: "new",
    read: false,
    date: new Date()
  })

  return { success, clientFeedback, whatsappMessage }
}

export async function submitQuoteForm(formData: {
  name: string
  phone: string
  email: string
  service: string
  projectType: string
  description: string
  kvkkAccepted: boolean
}) {
  if (!formData.kvkkAccepted) throw new Error("KVKK onayı zorunludur.")

  // 1. AI Analizi
  const { summary, clientFeedback, whatsappMessage } = await generateFormSummary('quote', formData)

  // 2. Firestore'a Kaydet
  const success = await saveToFirestore("messages", {
    type: "quote",
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    subject: `Teklif Talebi: ${formData.service}`,
    message: formData.description,
    projectDetails: `Tür: ${formData.projectType}`,
    aiSummary: summary,
    aiClientFeedback: clientFeedback,
    aiWhatsAppMessage: whatsappMessage,
    kvkkAccepted: true,
    role: "customer",
    status: "new",
    read: false,
    date: new Date()
  })

  return { success, clientFeedback, whatsappMessage }
}
