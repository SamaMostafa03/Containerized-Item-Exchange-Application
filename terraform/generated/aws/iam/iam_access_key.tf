resource "aws_iam_access_key" "tfer--AKIASITRZE66TRMADJDZ" {
  depends_on = ["aws_iam_user.tfer--AIDASITRZE663C3Z364NY"]
  status     = "Active"
  user       = "ahmed-iam"
}

resource "aws_iam_access_key" "tfer--AKIASITRZE66WL44RAF2" {
  depends_on = ["aws_iam_user.tfer--AIDASITRZE662XIYFERGX"]
  status     = "Active"
  user       = "sama"
}
