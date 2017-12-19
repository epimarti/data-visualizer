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
  { name: 'bits', volume: 'bits', speed: 'bps', value: kilo },
  { name: 'kilobits', volume: 'kbits', speed: 'kbps', value: kilo },
  { name: 'megabits', volume: 'Mbits', speed: 'Mbps', value: mega },
  { name: 'gigabits', volume: 'Gbits', speed: 'Gbps', value: giga },
  { name: 'terabits', volume: 'Tbits', speed: 'Tbps', value: tera },
  { name: 'petabits', volume: 'Pbits', speed: 'Pbps', value: peta },
  { name: 'exabits', volume: 'Ebits', speed: 'Ebps', value: exa },
  { name: 'zettabits', volume: 'Zbits', speed: 'Zbps', value: zetta },
  { name: 'yottabits', volume: 'Ybits', speed: 'Ybps', value: yotta }
];

@Pipe({
  name: 'bits'
})
export class BitsPipe implements PipeTransform {

  transform(value: number, precision?: number, unit?: string): string {
    if (!precision) {
      precision = 2;
    }
    if (unit !== 'speed' && unit !== 'volume') {
      unit = 'volume';
    }
    if (value < kilo) {
      return `${(value / dataRates[0].value).toFixed(precision)}${dataRates[0][unit]}`;

    }

    for (const i in dataRates) {
      if (value < dataRates[i].value) {
        return `${(value / dataRates[parseInt(i, 10) - 1].value).toFixed(precision)}${dataRates[parseInt(i, 10) - 1][unit]}`;
      }
    }
    return `${(value / dataRates[dataRates.length - 1].value).toFixed(precision)}${dataRates[dataRates.length - 1][unit]}`;
  }

}
