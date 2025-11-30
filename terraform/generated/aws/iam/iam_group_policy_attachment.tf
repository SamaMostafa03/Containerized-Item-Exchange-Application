resource "aws_iam_group_policy_attachment" "tfer--dev1_AdministratorAccess" {
  group      = "dev1"
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

resource "aws_iam_group_policy_attachment" "tfer--dev_AmazonAppFlowReadOnlyAccess" {
  group      = "dev"
  policy_arn = "arn:aws:iam::aws:policy/AmazonAppFlowReadOnlyAccess"
}

resource "aws_iam_group_policy_attachment" "tfer--dev_AmazonEC2ReadOnlyAccess" {
  group      = "dev"
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess"
}

resource "aws_iam_group_policy_attachment" "tfer--dev_AmazonQDeveloperAccess" {
  group      = "dev"
  policy_arn = "arn:aws:iam::aws:policy/AmazonQDeveloperAccess"
}

resource "aws_iam_group_policy_attachment" "tfer--dev_AmazonRDSReadOnlyAccess" {
  group      = "dev"
  policy_arn = "arn:aws:iam::aws:policy/AmazonRDSReadOnlyAccess"
}

resource "aws_iam_group_policy_attachment" "tfer--dev_AmazonS3ReadOnlyAccess" {
  group      = "dev"
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"
}

resource "aws_iam_group_policy_attachment" "tfer--dev_CloudWatchReadOnlyAccess" {
  group      = "dev"
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchReadOnlyAccess"
}

resource "aws_iam_group_policy_attachment" "tfer--dev_IAMReadOnlyAccess" {
  group      = "dev"
  policy_arn = "arn:aws:iam::aws:policy/IAMReadOnlyAccess"
}
