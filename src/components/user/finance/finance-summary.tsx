'use client'
import React, { useEffect } from 'react'

interface FinanceSummaryProps {
    familyId: string;
}

const FinanceSummary: React.FC<FinanceSummaryProps> = ({ familyId }) => {

    useEffect(() => {
        const fetchFinanceSummary = async () => {
            const data = await fetch(`/api/v1/finance/getSummary/${familyId}`)
        }
    }, [familyId])

    return (
        <div>Finance Summary</div>
    )
}

export default FinanceSummary