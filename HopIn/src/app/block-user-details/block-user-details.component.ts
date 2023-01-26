import { BlockService } from './../services/block.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../services/user.service';

@Component({
  selector: 'app-block-user-details',
  templateUrl: './block-user-details.component.html',
  styleUrls: ['./block-user-details.component.css']
})
export class BlockUserDetailsComponent implements OnInit {

  constructor(private blockService: BlockService) { }

  currentUser: User = {
    id: 0,
    name: "",
    surname: "",
    profilePicture: "",
    telephoneNumber: "",
    email: "",
    address: "",
    password: "",
    newPassword: "",
    isBlocked: false
  };

  isSelected: boolean = false;

  ngOnInit(): void {
    this.blockService.getUser().subscribe((res) => {
      this.currentUser = res;
    });

    this.blockService.getIsSelected().subscribe((selection) => {
      this.isSelected = selection;
    })
  }

}
