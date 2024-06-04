import { ButtonType } from '@/redux/types';

function AppleLoginButton({ onClick }: ButtonType) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-white bg-[#222222] hover:opacity-75 rounded-lg h-10 inline-flex text-center items-center text-sm font-medium px-5"
    >
      <div className="flex ml-1">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.1437 15.5861C17.8385 16.2848 17.4772 16.928 17.0586 17.5193C16.4881 18.3255 16.0209 18.8835 15.6609 19.1934C15.1027 19.702 14.5048 19.9625 13.8644 19.9773C13.4047 19.9773 12.8504 19.8477 12.205 19.5847C11.5576 19.323 10.9626 19.1934 10.4186 19.1934C9.84801 19.1934 9.23608 19.323 8.58155 19.5847C7.92602 19.8477 7.39793 19.9847 6.99417 19.9983C6.38012 20.0242 5.76806 19.7563 5.15713 19.1934C4.7672 18.8563 4.27947 18.2786 3.6952 17.4601C3.06832 16.586 2.55294 15.5725 2.14918 14.417C1.71677 13.1689 1.5 11.9603 1.5 10.7902C1.5 9.44984 1.79226 8.29383 2.37766 7.32509C2.83773 6.54696 3.44978 5.93316 4.21581 5.48255C4.98185 5.03195 5.80955 4.80233 6.70091 4.78763C7.18863 4.78763 7.82822 4.93714 8.62303 5.23096C9.4156 5.52576 9.92451 5.67526 10.1476 5.67526C10.3144 5.67526 10.8798 5.50045 11.8382 5.15195C12.7445 4.82874 13.5094 4.69492 14.136 4.74764C15.834 4.88343 17.1097 5.54675 17.9581 6.74177C16.4395 7.6536 15.6883 8.93072 15.7032 10.5691C15.7169 11.8452 16.1841 12.9071 17.1022 13.7503C17.5183 14.1417 17.983 14.4441 18.5 14.6589C18.3879 14.9812 18.2695 15.2898 18.1437 15.5861ZM14.2494 0.400114C14.2494 1.40034 13.8806 2.33425 13.1456 3.19867C12.2586 4.22629 11.1857 4.8201 10.0223 4.7264C10.0075 4.60641 9.99888 4.48011 9.99888 4.3474C9.99888 3.38718 10.4207 2.35956 11.1698 1.51934C11.5438 1.09392 12.0194 0.74019 12.5962 0.458013C13.1718 0.180046 13.7162 0.0263242 14.2282 0C14.2431 0.133715 14.2494 0.267438 14.2494 0.400101V0.400114Z"
            fill="white"
          />
        </svg>
        <p className="ml-1">Sign in with Apple</p>
      </div>
    </button>
  );
}

export default AppleLoginButton;
