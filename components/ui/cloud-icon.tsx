import React from 'react';

interface CloudIconProps {
  className?: string;
  opacity?: number;
}

export const CloudIcon: React.FC<CloudIconProps> = ({ className = "", opacity = 0.1 }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 200 120"
      fill="currentColor"
      opacity={opacity}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M150 60c0-13.807-11.193-25-25-25-2.437 0-4.796.35-7.037 1.003C112.946 23.763 100.019 15 85 15c-19.33 0-35 15.67-35 35 0 1.844.143 3.655.418 5.418C36.537 57.744 27 68.808 27 82c0 15.464 12.536 28 28 28h90c13.255 0 24-10.745 24-24 0-13.255-10.745-24-24-24h-2c1.243-3.684 2-7.633 2-11.8 0-.067 0-.133-.002-.2z" />
    </svg>
  );
};

export const CloudSmall: React.FC<CloudIconProps> = ({ className = "", opacity = 0.08 }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 150 90"
      fill="currentColor"
      opacity={opacity}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M115 45c0-10.355-8.395-18.75-18.75-18.75-1.828 0-3.597.262-5.278.752C86.21 17.822 76.515 12 65 12c-14.498 0-26.25 11.752-26.25 26.25 0 1.383.107 2.741.313 4.064C27.903 44.058 20 52.856 20 63.5c0 11.598 9.402 21 21 21h67.5c9.941 0 18-8.059 18-18s-8.059-18-18-18h-1.5c.932-2.763 1.5-5.725 1.5-8.85 0-.05 0-.1-.002-.15z" />
    </svg>
  );
};


