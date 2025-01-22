import React from 'react'
import Experience from '../../components/home/experience';
import { BreadcrumbExperience } from '../../components/common/BreadcrumbExperience';

export default function ExperiencePage() {
    return (
        <div className="min-h-screen">
            <BreadcrumbExperience />
            <Experience />
        </div>
    )
}
