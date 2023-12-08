export interface IImpactQuestion {
  description: string
  label: string
  isVisible: boolean
  value?: number
  suffix?: string
  prefix?: string
}

export const impactQuestions: IImpactQuestion[] = [
  {
    description:
      'How many KGs of plastic recycled have you recycled in that year?',
    label: 'plastic recycled',
    suffix: 'Kg of',
    isVisible: true,
  },
  {
    description:
      'What was your revenue (in $)? By revenue we mean all money coming in.',
    label: 'revenue',
    prefix: '$',
    isVisible: true,
  },
  {
    description: 'How many people did your project employ (you included)?',
    label: 'full time employees',
    isVisible: true,
  },
  {
    description: 'How many volunteers did you work with?',
    label: 'volunteers',
    isVisible: true,
  },
  {
    description: 'How many machines did you build?',
    label: 'machines built',
    isVisible: true,
  },
]
