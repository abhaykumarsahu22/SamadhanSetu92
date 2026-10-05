/**
 * Mock scheme data for SamadhanSetu.
 *
 * TEAMMATES: Replace this static array with your API response. The shape below
 * maps to the recommendation card UI. `matchScore` is the AI match percentage;
 * in production it would come from the matching engine, not be hard-coded.
 */

export type DocumentStatus = "ready" | "pending"

export type RequiredDocument = {
  id: string
  label: string
  status: DocumentStatus
}

export type Scheme = {
  id: string
  name: string
  shortName: string
  ministry: string
  matchScore: number
  subsidy: string
  maxLoan: string
  collateral: string
  summary: string
  officialUrl: string
  documents: RequiredDocument[]
}

export const SCHEMES: Scheme[] = [
  {
    id: "smile",
    name: "SMILE — Support for Marginalized Individuals for Livelihood & Enterprise",
    shortName: "SMILE",
    ministry: "Social Justice & Empowerment",
    matchScore: 96,
    subsidy: "Up to ₹1,50,000",
    maxLoan: "₹5,00,000",
    collateral: "Not required",
    summary:
      "SMILE supports livelihood and micro-enterprise for marginalized individuals with a 96 percent match to your profile. It offers a subsidy of up to one lakh fifty thousand rupees, a maximum loan of five lakh rupees, and requires no collateral.",
    officialUrl: "https://socialjustice.gov.in/",
    documents: [
      { id: "aadhaar", label: "Aadhaar Card", status: "ready" },
      { id: "caste", label: "Caste Certificate", status: "ready" },
      { id: "project", label: "Project Report", status: "pending" },
      { id: "bank", label: "Bank Passbook", status: "ready" },
    ],
  },
  {
    id: "nsfdc",
    name: "NSFDC Term Loan — National Scheduled Castes Finance & Development Corporation",
    shortName: "NSFDC",
    ministry: "Social Justice & Empowerment",
    matchScore: 91,
    subsidy: "Interest subvention 2%",
    maxLoan: "₹30,00,000",
    collateral: "Required above ₹5L",
    summary:
      "NSFDC provides concessional term loans for Scheduled Caste entrepreneurs with a 91 percent match. It offers two percent interest subvention, a maximum loan of thirty lakh rupees, and collateral is required above five lakh rupees.",
    officialUrl: "https://nsfdc.nic.in/",
    documents: [
      { id: "aadhaar", label: "Aadhaar Card", status: "ready" },
      { id: "caste", label: "Caste Certificate", status: "ready" },
      { id: "project", label: "Project Report", status: "pending" },
      { id: "income", label: "Income Certificate", status: "pending" },
    ],
  },
  {
    id: "nbcfdc",
    name: "NBCFDC Micro-Finance — National Backward Classes Finance & Development Corporation",
    shortName: "NBCFDC",
    ministry: "Social Justice & Empowerment",
    matchScore: 88,
    subsidy: "Up to ₹50,000",
    maxLoan: "₹1,25,000",
    collateral: "Not required",
    summary:
      "NBCFDC micro-finance supports backward class artisans and small entrepreneurs with an 88 percent match. It offers a subsidy up to fifty thousand rupees, a maximum loan of one lakh twenty five thousand rupees, and requires no collateral.",
    officialUrl: "https://nbcfdc.gov.in/",
    documents: [
      { id: "aadhaar", label: "Aadhaar Card", status: "ready" },
      { id: "caste", label: "OBC Certificate", status: "pending" },
      { id: "bank", label: "Bank Passbook", status: "ready" },
    ],
  },
  {
    id: "pmegp",
    name: "PMEGP — Prime Minister's Employment Generation Programme",
    shortName: "PMEGP",
    ministry: "MSME",
    matchScore: 84,
    subsidy: "15–35% of project cost",
    maxLoan: "₹25,00,000",
    collateral: "Not required up to ₹10L",
    summary:
      "PMEGP helps set up new micro-enterprises in manufacturing and services with an 84 percent match. Subsidy ranges from fifteen to thirty five percent of project cost, the maximum loan is twenty five lakh rupees, and no collateral is required up to ten lakh rupees.",
    officialUrl: "https://www.kviconline.gov.in/pmegpeportal/",
    documents: [
      { id: "aadhaar", label: "Aadhaar Card", status: "ready" },
      { id: "project", label: "Project Report", status: "pending" },
      { id: "bank", label: "Bank Passbook", status: "ready" },
      { id: "edp", label: "EDP Training Certificate", status: "pending" },
    ],
  },
]

export const SOCIAL_CATEGORIES = ["SC", "ST", "OBC", "EBC", "General", "Divyangjan", "Transgender"] as const

export const ENTERPRISE_TYPES = [
  "Artisan / Handicraft",
  "Small Shop / Retail",
  "Agriculture / Allied",
  "Manufacturing",
] as const

export const LOAN_RANGES = [
  "Up to ₹50,000",
  "₹50,000 – ₹2,00,000",
  "₹2,00,000 – ₹10,00,000",
  "Above ₹10,00,000",
] as const

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Gujarat",
  "Haryana",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
] as const
