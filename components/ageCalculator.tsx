import React from 'react'
import { differenceInYears } from 'date-fns';

interface AgeCalculatorProps {
    birthdate: string; // La date de naissance fournie sous forme de chaîne
  }

const AgeCalculator: React.FC<AgeCalculatorProps> = ({ birthdate }) => {
    // Convertir la date de naissance en objet Date
    const birthdateDate = new Date(birthdate);
    // Calculer l'âge en années
    const age = differenceInYears(new Date(), birthdateDate);
  return (age)
}

export default AgeCalculator
