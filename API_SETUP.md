# Expense Tracker API Setup

## Required Dependencies Installation

You need to install these additional dependencies:

```bash
npm install @prisma/client cors
npm install --save-dev @types/cors
```

## Database Setup

1. Make sure your `.env` file has the DATABASE_URL:
```
DATABASE_URL="postgresql://username:password@localhost:5432/expense_tracker"
```

2. Generate Prisma client and run migrations:
```bash
npx prisma generate
npx prisma db push  # or npx prisma migrate dev
```

## API Endpoints

### Create Expense
- **POST** `/api/expenses`
- **Content-Type**: `application/json`

**Request Body:**
```json
{
  "description": "Grocery shopping",
  "amount": 85.50,
  "userId": "user-uuid-here",
  "categoryId": "category-uuid-here"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Expense created successfully",
  "data": {
    "expenseId": "expense-uuid",
    "description": "Grocery shopping",
    "amount": "85.50",
    "dateCreated": "2025-09-26T19:27:47.123Z",
    "user": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com"
    },
    "category": {
      "name": "Food"
    }
  }
}
```

### Get User Expenses
- **GET** `/api/expenses/:userId`

**Response:**
```json
{
  "success": true,
  "message": "Expenses retrieved successfully",
  "data": [
    {
      "expenseId": "expense-uuid",
      "description": "Grocery shopping",
      "amount": "85.50",
      "dateCreated": "2025-09-26T19:27:47.123Z",
      "category": {
        "name": "Food"
      }
    }
  ]
}
```

### Health Check
- **GET** `/api/health`

## Testing with cURL

```bash
# Create expense
curl -X POST http://localhost:3000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Coffee",
    "amount": 5.50,
    "userId": "your-user-id",
    "categoryId": "your-category-id"
  }'

# Get expenses
curl http://localhost:3000/api/expenses/your-user-id
```

## Notes

- Make sure to create a User and Category first in your database before creating expenses
- The API validates that users and categories exist before creating expenses
- Amounts are stored as Decimal for precision
- All timestamps are in ISO format