import { Pipe, PipeTransform } from '@angular/core';

const kilo = 1024;
const mega = kilo * 1024;
const giga = mega * 1024;
const tera = giga * 1024;
const peta = tera * 1024;
const exa = peta * 1024;
const zetta = exa * 1024;
const yotta = zetta * 1024;

const dataRates = [
  { name: 'kilobits', abrev: 'kbits', value: kilo },
  { name: 'megabits', abrev: 'Mbits', value: mega },
  { name: 'gigabits', abrev: 'Gbits', value: giga },
  { name: 'terabits', abrev: 'Tbits', value: tera },
  { name: 'petabits', abrev: 'Pbits', value: peta },
  { name: 'exabits', abrev: 'Ebits', value: exa },
  { name: 'zettabits', abrev: 'Zbits', value: zetta },
  { name: 'yottabits', abrev: 'Ybits', value: yotta }
];

@Pipe({
  name: 'dataRate'
})
export class DataRatePipe implements PipeTransform {

  transform(value: number, precision?: number): string {
    if (!precision) {
      precision = 2;
    }
    if (value < kilo) { return `${value}bits`; }

    for (const i in dataRates) {
      if (value < dataRates[i].value) {
        return `${(value / dataRates[parseInt(i, 10) - 1].value).toFixed(precision)}${dataRates[parseInt(i, 10) - 1].abrev}`;
      }
    }
    return `${(value / dataRates[dataRates.length - 1].value).toFixed(precision)}${dataRates[dataRates.length - 1].abrev}`;
  }

}
