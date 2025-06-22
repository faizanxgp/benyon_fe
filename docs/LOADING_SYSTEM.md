# Global Loading System

## Overview
A comprehensive loading system that automatically shows animated loading spinners during API calls and allows manual control for other loading operations.

## Features
- **Automatic API Loading**: Shows spinner automatically for all API calls via axios interceptors
- **Manual Loading Control**: Provides hooks for custom loading scenarios
- **Loading Counter**: Handles multiple concurrent operations correctly
- **Global Spinner**: Consistent spinner design across the entire application

## Automatic API Loading
All API calls using the configured axios instance will automatically show/hide the loading spinner:

```javascript
import { getUsersStatus, createUser } from '../services/api';

// These will automatically show loading spinner
const users = await getUsersStatus();
const newUser = await createUser(userData);
```

## Manual Loading Control

### Basic Manual Loading
```javascript
import { useManualLoading } from '../layout/context';

const MyComponent = () => {
  const { showLoading, hideLoading } = useManualLoading();

  const handleManualOperation = async () => {
    showLoading();
    try {
      // Your async operation here
      await someNonApiOperation();
    } finally {
      hideLoading();
    }
  };

  return (
    <button onClick={handleManualOperation}>
      Start Operation
    </button>
  );
};
```

### Using withLoading Helper
```javascript
import { useManualLoading } from '../layout/context';

const MyComponent = () => {
  const { withLoading } = useManualLoading();

  const handleOperation = () => {
    withLoading(async () => {
      // Your async operation here
      await someNonApiOperation();
      return result;
    });
  };

  return (
    <button onClick={handleOperation}>
      Start Operation
    </button>
  );
};
```

## Spinner Design
- **Primary Color**: Uses the configured primary color (#7c040e)
- **Overlay**: Semi-transparent dark background
- **Position**: Fixed, centered on screen
- **Z-index**: 9999 (appears above all content)
- **Animation**: Smooth spinning animation

## Implementation Details

### Files Created/Modified:
1. `src/layout/context/LoadingContext.jsx` - Loading state management
2. `src/layout/components/GlobalLoadingSpinner.jsx` - Spinner component
3. `src/layout/main.jsx` - Integration with main layout
4. `src/services/api.js` - Axios interceptors for automatic loading

### How It Works:
1. **LoadingProvider** wraps the entire application
2. **Axios interceptors** automatically call show/hide loading
3. **Loading counter** tracks multiple concurrent operations
4. **Global spinner** renders when loading count > 0
5. **Manual hooks** allow custom loading control

## Customization
The spinner can be customized by modifying:
- `GlobalLoadingSpinner.jsx` for appearance
- `LoadingContext.jsx` for behavior
- Spinner variants in the existing Spinner component

## Usage Examples

### For Page Loading
```javascript
const MyPage = () => {
  const { showLoading, hideLoading } = useManualLoading();
  
  useEffect(() => {
    const loadPageData = async () => {
      showLoading();
      try {
        // Load page data
      } finally {
        hideLoading();
      }
    };
    
    loadPageData();
  }, []);
  
  return <div>Page content</div>;
};
```

### For Form Submission
```javascript
const MyForm = () => {
  const { withLoading } = useManualLoading();
  
  const handleSubmit = (formData) => {
    withLoading(async () => {
      // Process form submission
      await processForm(formData);
    });
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
};
```
