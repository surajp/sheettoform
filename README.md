# Google Sheets to Forms
Simple Script that converts Google Sheets to Google Form


## Create a sheet that has the following format:
Question, Type, Choice 1, Chocie 2, Choice 3...

## Acceptable values for Type (Case-Sensitive)
- Section Title
- New Page
- Checkbox
- Multiple
- Text
- Title
- Description
- Comments
- Message
- Dropdown
- Time
- Rank
- Linear

## Note
Multiple,Dropdown and Checkbox type expect values for one or more Choice columns. Non-compliant rows will be ignored. Choice columns are ignored for all other types. For title and description, latter rows will override any former rows.

