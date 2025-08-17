# Duration Arabic Time Units Pipe

An Angular TypeScript pipe for bilingual time duration formatting. Supports English and Arabic with proper Arabic grammatical rules to count months, days, hours and minutes.

## How It Works

The `TimeUnitPipe` is an Angular pipe that intelligently formats time durations in both English and Arabic, with sophisticated handling of Arabic grammatical rules.

### Basic Usage
```typescript
{{ 5 | timeUnit:'day' }}        // English: "5 days"
{{ 1 | timeUnit:'hour' }}       // Arabic: "ساعة واحدة" 
{{ 2 | timeUnit:'month':'مرفوع' }} // Arabic: "شهران" (nominative case)
```

### Language Detection
The pipe automatically detects the current language from `localStorage.getItem("lang")`:
- **English (`'en'`)**: Uses standard English pluralization rules
- **Arabic (default)**: Applies complex Arabic grammatical structures

### English Formatting
For English, the pipe follows simple pluralization:
- `1 day` (singular)
- `2 days`, `5 days` (plural with 's')

### Arabic Formatting
Arabic formatting follows traditional Arabic grammar rules based on the number:

| Number Range | Rule | Example (days) |
|--------------|------|----------------|
| 1 | Singular with "واحد" | `يوم واحد` |
| 2 | Dual form (مرفوع/مجرور) | `يومان` / `يومين` |
| 3-10 | Plural form | `أيام` |
| 11-99 | Singular with تنوين | `يوماً` |
| 100+ | Cycles back based on last two digits | `100 يوم`, `103 أيام` |

#### Months
```
1: شهر واحدة
2: شهرين/شهران
3-10: أشهر
11-99: شهراً
100-102: شهر
```
#### Days
```
1: يوم واحد
2: يومين/يومان
3-10: أيام
11-99: يوماً
100-102: يوم
```
#### Hours
```
1: ساعة واحدة
2: ساعتين/ساعتان
3-10: ساعات
11-99: ساعة
100-102: ساعة
```
#### Minutes
```
1: دقيقة واحدة
2: دقيقتين/دقيقتان
3-10: دقائق
11-99: دقيقة
100-102: دقيقة
```

#### Examples
```
- 205 أيام   
- 177 شهراً
- 310 ساعات
- 602 يوم
- 901 شهر
```

### Special Features

#### Dual Case Support
The third parameter controls Arabic dual forms:
```typescript
{{ 2 | timeUnit:'day':'مرفوع' }}  // "يومان" (nominative)
{{ 2 | timeUnit:'day':'مجرور' }}  // "يومين" (accusative/genitive)
```

#### Number Display Logic
- **Arabic**: Numbers 1 and 2 show only the text form (`يوم واحد`, `يومان`)
- **Arabic**: Numbers 3+ show both number and unit (`٣ أيام`, `٥٠ يوماً`)
- **English**: Always shows number and unit (`1 day`, `5 days`)

#### Large Number Handling (100+)
For Arabic numbers ≥ 100, the pipe uses modulo logic:
- If ones digit is 1 or 2: treats as 11-99 range (`101 يوم`, `102 يوم`)
- Otherwise: uses last two digits rule (`103 أيام`, `200 يوم`)

### Supported Time Units
- `'minute'` - دقيقة/دقائق
- `'hour'` - ساعة/ساعات  
- `'day'` - يوم/أيام
- `'month'` - شهر/أشهر

## Installation

1. Copy the `time-unit.pipe.ts` file to your Angular project
2. Import and declare the pipe in your module:

```typescript
import { TimeUnitPipe } from './path/to/time-unit.pipe';

@NgModule({
  declarations: [
    TimeUnitPipe
  ],
  // ...
})
export class YourModule { }
```

## Usage Examples

```html
<!-- Basic usage -->
<p>{{ 5 | timeUnit:'day' }}</p>

<!-- With dual case -->
<p>{{ 2 | timeUnit:'hour':'مرفوع' }}</p>

<!-- In templates -->
<div>
  Remaining: {{ remainingDays | timeUnit:'day' }}
</div>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

