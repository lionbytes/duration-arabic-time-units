import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeUnit'
})
export class TimeUnitPipe implements PipeTransform {
  
  transform(
      value: number, 
      unit: 'day' | 'month' | 'hour' | 'minute', 
      dual: string = "منصوب"
  ): string {
    
    if (isNaN(value)) {
      return '';
    }

    const currentLang = localStorage.getItem("lang");
    
    if (currentLang === 'en') {
      const unitLabel = this.getEnglishUnit(value, unit);
      return `${value} ${unitLabel}`;
    }
     
    // For Arabic: return value only if value isn't 1 or 2 
    const unitLabel = this.getArabicUnit(value, unit, dual);
    return [1,2].includes(value) ? unitLabel : `${value} ${unitLabel}`;
  }

  // Get the appropriate English unit based on value and unit type
  private getEnglishUnit(
    value: number, 
    unit: 'day' | 'month' | 'hour' | 'minute'
  ): string {
    
    const units: Record<string, string> = {
      minute: 'minute',
      hour: 'hour', 
      day: 'day',
      month: 'month',
    };

    const baseUnit = units[unit] || 'hour';
    return value === 1 ? baseUnit : `${baseUnit}s`;
  }

  // Get the appropriate Arabic unit based on value and unit type
  private getArabicUnit(
    value: number, 
    unit: 'day' | 'month' | 'hour' | 'minute', 
    dual: string
  ): string {

    // For numbers >= 100, use modulo logic to determine the rule
    let effectiveValue = value;
    if (value >= 100) {
      const lastTwoDigits = value % 100;
      const onesDigit = value % 10;
      
      // If ones digit is 1 or 2, treat as 11-99 case
      if (onesDigit === 1 || onesDigit === 2) {
        effectiveValue = 100; // Time unit is as if the value is 100
      } else {
        effectiveValue = lastTwoDigits;
      }
    }

    // Handle minutes
    if (unit === 'minute') {
      if (effectiveValue === 1) {
        return ' دقيقة واحدة';
      } else if (effectiveValue === 2) {
        return (dual === 'مرفوع' ? 'دقيقتان' : 'دقيقتين');
      } else if (effectiveValue >= 3 && effectiveValue <= 10) {
        return 'دقائق';
      } else {
        return 'دقيقة';
      }
    }
    
    // Handle hours
    if (unit === 'hour') {
      if (effectiveValue === 1) {
        return ' ساعة واحدة';
      } else if (effectiveValue === 2) {
        return (dual === 'مرفوع' ? 'ساعتان' : 'ساعتين');
      } else if (effectiveValue >= 3 && effectiveValue <= 10) {
        return 'ساعات';
      } else {
        return 'ساعة';
      }
    }
    
    // Handle days
    if (unit === 'day') {
      if (effectiveValue === 1) {
        return 'يوم واحد';
      } else if (effectiveValue === 2) {
        return (dual === 'مرفوع' ? 'يومان' : 'يومين');
      } else if (effectiveValue >= 3 && effectiveValue <= 10) {
        return 'أيام';
      } else if (effectiveValue >= 11 && effectiveValue <= 99) {
        return 'يوماً';
      } else {
        return 'يوم';
      }
    }

    // Handle months
    if (unit === 'month') {
      if (effectiveValue === 1) {
        return 'شهر واحد';
      } else if (effectiveValue === 2) {
        return (dual === 'مرفوع' ? 'شهران' : 'شهرين');
      } else if (effectiveValue >= 3 && effectiveValue <= 10) {
        return 'أشهر';
      } else if (effectiveValue >= 11 && effectiveValue <= 99) {
        return 'شهراً';
      } else {
        return 'شهر';
      }
    }

    // Default return for unspecified unit
    if (unit === 'day') {
      return 'يوم';
    } else if (unit === 'month') {
      return 'شهر';
    } else if (unit === 'hour') {
      return 'ساعة';
    } else if (unit === 'minute') {
      return 'دقيقة';
    } else {
      return '';
    }
  }
}