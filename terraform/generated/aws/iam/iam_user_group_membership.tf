resource "aws_iam_user_group_membership" "tfer--ahmed-iam-002F-dev" {
  groups = ["dev"]
  user   = "ahmed-iam"
}

resource "aws_iam_user_group_membership" "tfer--sama-002F-dev1" {
  groups = ["dev1"]
  user   = "sama"
}
