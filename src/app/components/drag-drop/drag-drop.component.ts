import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CdkDragStart, CdkDragDrop, transferArrayItem, moveItemInArray, CdkDragEnter, copyArrayItem, CdkDrag, CdkDragSortEvent, CdkDragExit, CdkDragConfig, CdkDragEnd } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {
  state: any;
  @ViewChild('breakfastList') breakfastList: any;
  @ViewChild('lunchList') lunchList: any;
  @ViewChild('eveningList') eveningList: any;

  breakfast = []
  lunch = []
  evening = []

  done = [
    {
      name: 'Food1',
      imageURL: 'https://cdn.cnn.com/cnnnext/dam/assets/171027052520-processed-foods-exlarge-tease.jpg',
      event: 1,
      allow: ['L', 'E']
    },
    {
      name: 'Food2',
      imageURL: 'https://i.ytimg.com/vi/P2DFREWkmiQ/maxresdefault.jpg',
      event: 2,
      allow: ['B', 'L']
    },
    {
      name: 'Food3',
      imageURL: 'https://cdn.newsapi.com.au/image/v1/053e70ddc55e5aa4b1584e2485331c20',
      event: 3,
      allow: ['B', 'E']
    },
    {
      name: 'Food4',
      imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--gf7NfpMG--/c_scale,f_auto,fl_progressive,q_80,w_800/ox6m5b5fev1yoifdlnda.jpg',
      event: 4,
      allow: ['B']
    }
  ];

  ngOnInit() {
    this.breakfastList = this.breakfastList.element.nativeElement.dataset;
    this.lunchList = this.lunchList.element.nativeElement.dataset;
    this.eveningList = this.eveningList.element.nativeElement.dataset;
  }

  drop(event: CdkDragDrop<string[]>) {
    const $containerID = event.container.id;
    this.getContainer($containerID, event.container.data, event.currentIndex, event.previousContainer.data, event.previousIndex);

  }
  getContainer($containerID, $currentContainerData, $currentIndex, $prevContainerData, $prevIndex) {

    const $dataMovedContainer = $prevContainerData[$prevIndex].allow;
    const $dataAllowConfig = this.getAllowDataConfig($containerID); // find data config
    const $allowDataConfig = this.getFilterAllowConfig($dataMovedContainer, $dataAllowConfig);

    if ($currentContainerData.length <= 0 && $allowDataConfig.length > 0) {
      copyArrayItem($prevContainerData,
        $currentContainerData,
        $prevIndex,
        $currentIndex);
    } else if ($currentContainerData.length > 0 && $allowDataConfig.length > 0) {
      $currentContainerData.splice(0, 1);
      copyArrayItem($prevContainerData,
        $currentContainerData,
        $prevIndex,
        $currentIndex)
    }
  }
  getFilterAllowConfig($prevContainerData, $currentConTainnerConfig) {
    return $prevContainerData.filter((val, index, data) => {
      return val == $currentConTainnerConfig;
    });
  }
  getAllowDataConfig($containerID) {
    if ($containerID == 'cdk-drop-list-0') return this.breakfastList.config;
    if ($containerID == 'cdk-drop-list-1') return this.lunchList.config;
    if ($containerID == 'cdk-drop-list-2') return this.eveningList.config;
  }
  evenPredicate($currentContainer: CdkDrag<any>, $prevContainer: any) {
    const $dropContainerID = $currentContainer.dropContainer.id;
    return true;
  }
  dragEnded($event: CdkDragEnd) {
    document.querySelectorAll('.detected').forEach(el => {
      el.classList.remove('detected');
    });
  }
  dragStarted($event: CdkDragStart) {
    const $queryDom = document.querySelectorAll('.example-list-0');
    $queryDom.forEach(element => {
      let configData = element.getAttribute('data-config');
      var $el = this.onFilterAllow($event.source.data.allow, configData);
      if ($el.length > 0) {
        element.classList.add('detected');
      }
    });
  }
  onFilterAllow(dataArray, dataCompaired) {
    return dataArray.filter((el) => {
      return el == dataCompaired;
    });
  }
}
