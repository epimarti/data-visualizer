import {
  Component,
  Input,
  Output,
  ViewEncapsulation,
  EventEmitter,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef
} from '@angular/core';
import { calculateViewDimensions, ViewDimensions } from '@swimlane/ngx-charts/release/common/view-dimensions.helper';
import { ColorHelper } from '@swimlane/ngx-charts/release/common/color.helper';
import { BaseChartComponent } from '@swimlane/ngx-charts/release/common/base-chart.component';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: [
    '../../../node_modules/@swimlane/ngx-charts/release/common/base-chart.component.css',
    '../../../node_modules/@swimlane/ngx-charts/release/pie-chart/pie-chart.component.css'
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformsComponent extends BaseChartComponent {

  @Input() labels = false;
  @Input() legend = false;
  @Input() legendTitle = 'Legend';
  @Input() xAxis;
  @Input() yAxis;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() explodeSlices = false;
  @Input() doughnut = false;
  @Input() arcWidth = 0.25;
  @Input() gradient: boolean;
  @Input() activeEntries: any[] = [];
  @Input() tooltipDisabled = false;
  @Input() labelFormatting: any;
  @Input() tooltipText: any;
  @Input() platformsData: any;

  @Output() select = new EventEmitter();
  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;

  translation: string;
  outerRadius: number;
  innerRadius: number;
  colors: ColorHelper;
  domain: any;
  dims: ViewDimensions;
  margin = [20, 20, 20, 20];
  legendOptions: any;
  formatedData: any[];
  xAxisHeight = 0;
  yAxisWidth = 0;

  update(): void {
    super.update();

    if (this.labels) {
      this.margin = [30, 80, 30, 80];
    }

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin,
      showXAxis: this.xAxis,
      showYAxis: this.yAxis,
      xAxisHeight: this.xAxisHeight,
      yAxisWidth: this.yAxisWidth,
      showXLabel: this.showXAxisLabel,
      showYLabel: this.showYAxisLabel,
      showLegend: this.legend,
      legendType: this.schemeType
    });

    const xOffset = this.margin[3] + this.dims.width / 2;
    const yOffset = this.margin[0] + this.dims.height / 2;
    this.translation = `translate(${xOffset}, ${yOffset})`;
    this.outerRadius = Math.min(this.dims.width, this.dims.height);
    if (this.labels) {
      // make room for labels
      this.outerRadius /= 3;
    } else {
      this.outerRadius /= 2;
    }
    this.innerRadius = 0;

    this.domain = this.getDomain();

    this.formatData();
    this.setColors();

    this.legendOptions = this.getLegendOptions();
  }

  getDomain(): any[] {
    const items = [];

    this.platformsData.map(d => {
      let label = d.name;
      if (label.constructor.name === 'Date') {
        label = label.toLocaleDateString();
      } else {
        label = label.toLocaleString();
      }

      if (items.indexOf(label) === -1) {
        items.push(label);
      }
    });

    return items;
  }

  onClick(data): void {
    this.select.emit(data);
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
  }

  getLegendOptions() {
    return {
      scaleType: 'ordinal',
      domain: this.domain,
      colors: this.colors,
      title: this.legendTitle
    };
  }

  outerRadiusFor(index: number): number {
    return this.innerRadiusFor(index + 1);
  }

  innerRadiusFor(index: number): number {
    return (this.outerRadius / this.platformsData.length) * index;
  }

  onActivate(item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value;
    });
    if (idx > -1) {
      return;
    }

    this.activeEntries = [ item, ...this.activeEntries ];
    this.activate.emit({ value: item, entries: this.activeEntries });
  }

  onDeactivate(item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value;
    });

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }

  private formatData() {
    this.formatedData = [
      this.platformsData.map(mu => ({ name: mu.name, value: mu.series.find(x => x.name === 'max_viewers').value})),
      this.platformsData.map(cdn => ({ name: cdn.name, value: cdn.series.find(x => x.name === 'cdn').value})),
      this.platformsData.map(p2p => ({ name: p2p.name, value: p2p.series.find(x => x.name === 'p2p').value})),
      this.platformsData.map(upload => ({ name: upload.name, value: upload.series.find(x => x.name === 'upload').value})),
    ];
  }
}
