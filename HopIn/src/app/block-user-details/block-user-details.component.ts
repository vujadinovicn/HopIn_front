import { MatSnackBar } from '@angular/material/snack-bar';
import { BlockService } from './../services/block.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../services/user.service';

@Component({
  selector: 'app-block-user-details',
  templateUrl: './block-user-details.component.html',
  styleUrls: ['./block-user-details.component.css']
})
export class BlockUserDetailsComponent implements OnInit {

  constructor(private blockService: BlockService,
    private snackBar: MatSnackBar) { }

  currentUser: User = {} as User;
  isSelected: boolean = false;

  ngOnInit(): void {
    this.blockService.getUser().subscribe((res) => {
      this.currentUser = res;
    });

    this.blockService.getIsSelected().subscribe((selection) => {
      this.isSelected = selection;
    });
  }
  

  blockUser(): void {
      this.blockService.block(this.currentUser.id).subscribe({
        next: (res: any) => {
          this.currentUser.blocked = true;
        },
        error: (error: any) => {
          this.snackBar.open(error.error.message, "", {
            duration: 2000,
         });        }      
      })
  }

  unblockUser(): void {
    this.blockService.unblock(this.currentUser.id).subscribe({
      next: (res: any) => {
        this.currentUser.blocked = false;
      },
      error: (error: any) => {
        this.snackBar.open(error.error.message, "", {
          duration: 2000,
       });        }      
    })
}

}
